import { TCreateStudentPayload } from '../validation';
import { Formatter } from '../../../utils/helpers/helper';
import { AppError } from '../../../utils/app-error';
import { BCRYPT_SALT } from '../../../config';
import { UserModel } from '../../user/model';
import { StudentModel } from '../model';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const CreateStudent = async (payload: TCreateStudentPayload) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const currentYear = new Date().getFullYear();
    const start = new Date(currentYear, 0, 1);
    const end = new Date(currentYear + 1, 0, 1);

    const studentCount = await StudentModel.countDocuments({
      section: payload.section,
      createdAt: { $gte: start, $lte: end },
    });

    const year = String(currentYear).slice(2);
    const studentId = `${
      payload.section === 'BOY' ? 'B' : 'G'
    }-${year}-${Formatter(String(studentCount + 1), 3)}`;

    const hashedPassword = await bcrypt.hash(
      payload.birthCertification,
      BCRYPT_SALT!
    );

    const [newUser] = await UserModel.create(
      [
        {
          name: payload.name.englishName,
          password: hashedPassword,
          role: 'STUDENT',
          userId: studentId,
        },
      ],
      { session }
    );

    if (!newUser) throw new AppError('Failed to create a new user', 400);

    const [newStudent] = await StudentModel.create(
      [{ ...payload, studentId, userId: newUser._id }],
      { session }
    );

    if (!newStudent) throw new AppError('Failed to create new student', 400);

    await session.commitTransaction();
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(error.message || 'Something went wrong', 400);
  } finally {
    await session.endSession();
  }
};
