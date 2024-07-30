import { TCreateStudentPayload } from '../validation';
import { AppError } from '../../../utils/app-error';
import { User } from '../../user/model';
import { Student } from '../model';
import mongoose from 'mongoose';
import { formatter, hashPassword } from '../../../helpers';

export const CreateStudent = async (payload: TCreateStudentPayload) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const currentYear = new Date().getFullYear();
    const start = new Date(currentYear, 0, 1);
    const end = new Date(currentYear + 1, 0, 1);

    const studentCount = await Student.countDocuments({
      section: payload.section,
      createdAt: { $gte: start, $lte: end },
    });

    const year = String(currentYear).slice(2);
    const studentId = `${
      payload.section === 'BOY' ? 'B' : 'G'
    }-${year}-${formatter(String(studentCount + 1), 3)}`;

    const hashedPassword = await hashPassword(payload.birthCertification);

    const [newUser] = await User.create(
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

    const [newStudent] = await Student.create(
      [{ ...payload, studentId, userId: newUser._id }],
      { session }
    );

    if (!newStudent) throw new AppError('Failed to create new student', 400);

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(error.message, 400);
  }
};
