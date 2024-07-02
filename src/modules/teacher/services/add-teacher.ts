import mongoose from 'mongoose';
import { TAddTeacherPayload } from '../validation';
import { TeacherModel } from '../model';
import { Formatter, hashPassword } from '../../../utils/helpers';
import { UserModel } from '../../user/model';
import { AppError } from '../../../utils/app-error';

export const AddTeacher = async (payload: TAddTeacherPayload) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const teacherCount = await TeacherModel.countDocuments();
    const teacherId = `T-${Formatter(String(teacherCount + 1), 2)}`;

    // hashing the password
    const password = await hashPassword(payload.nid);
    // creating a new user
    const [newUser] = await UserModel.create(
      [{ name: payload.name, password, role: 'TEACHER', userId: teacherId }],
      { session }
    );

    if (!newUser) throw new AppError('Failed to create a user', 400);

    const [newTeacher] = await TeacherModel.create(
      [{ ...payload, userId: newUser._id, teacherId }],
      { session }
    );

    await session.commitTransaction();
    await session.endSession();
    return newTeacher;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(error.message, 400);
  }
};
