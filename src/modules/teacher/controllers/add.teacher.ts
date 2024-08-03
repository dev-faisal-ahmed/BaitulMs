import mongoose from 'mongoose';
import { AppError, TryCatch } from '../../../utils';
import { TAddTeacherPayload } from '../validation';
import { Teacher } from '../model';
import { formatter, hashPassword, sendSuccessResponse } from '../../../helpers';
import { User } from '../../user/model';

export const AddTeacher = TryCatch(async (req, res) => {
  const payload: TAddTeacherPayload = req.body;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const teacherCount = await Teacher.countDocuments();
    const teacherId = `T-${formatter(String(teacherCount + 1), 2)}`;

    // hashing the password
    const password = await hashPassword(payload.nid);
    // creating a new user
    const [newUser] = await User.create(
      [{ name: payload.name, password, role: 'TEACHER', userId: teacherId }],
      { session }
    );

    if (!newUser) throw new AppError('Failed to create a user', 400);

    const [newTeacher] = await Teacher.create(
      [{ ...payload, userId: newUser._id, teacherId }],
      { session }
    );

    await session.commitTransaction();
    await session.endSession();

    sendSuccessResponse(res, {
      status: 200,
      message: 'Teacher Added Successfully',
      data: newTeacher,
    });
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(error.message, 400);
  }
});
