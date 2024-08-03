import mongoose from 'mongoose';
import { AppError, TryCatch } from '../../../utils';
import { TAddStudentPayload } from '../validation';
import { Student } from '../model';
import { formatter, hashPassword, sendSuccessResponse } from '../../../helpers';
import { User } from '../../user/model';

export const AddStudent = TryCatch(async (req, res) => {
  const payload: TAddStudentPayload = req.body;

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

    sendSuccessResponse(res, {
      status: 200,
      message: 'Student Added Successfully',
      data: newStudent,
    });
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(error.message, 400);
  }
});
