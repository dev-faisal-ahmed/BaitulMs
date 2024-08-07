import mongoose from 'mongoose';
import { AppError, TryCatch } from '../../../utils';
import { TAddTeacherAttendancesPayload } from '../validation';
import { getDayRange, sendSuccessResponse } from '../../../helpers';
import { DateTracker } from '../../date.tracker/model';
import { Attendance } from '../model';
import { Teacher } from '../../teacher/model';

export const AddTeacherAttendances = TryCatch(async (req, res) => {
  const payload: TAddTeacherAttendancesPayload = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const today = new Date();
    const { startOfDay, endOfDay } = getDayRange(today);

    const todaysInfo = await DateTracker.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
      dateFor: 'TEACHER',
    });

    if (todaysInfo && todaysInfo.status === 'HOLIDAY')
      throw new Error('Today is holiday');

    const teacherIds = payload.teacherIds.reduce((acc: string[], teacherId) => {
      acc.push(teacherId);
      return acc;
    }, []);

    const attendances = [];
    for (const teacherId of teacherIds) {
      const isAttendanceExist = await Attendance.findOne({
        date: { $gte: startOfDay.toString(), $lte: endOfDay.toString() },
        teacherId,
      });

      const teacherInfo = await Teacher.findOne({ _id: teacherId });

      if (!teacherInfo) {
        attendances.push(`Invalid TeacherId`);
        continue;
      }

      if (isAttendanceExist) {
        attendances.push(
          `ID: ${teacherInfo.teacherId} : Already ${isAttendanceExist.status}`
        );

        continue;
      }

      const [attendance] = await Attendance.create(
        [{ teacherId, date: new Date().toString() }],
        { session }
      );

      if (attendance)
        attendances.push(`ID: ${teacherInfo.teacherId} : Present`);
    }

    if (!todaysInfo) {
      const [newDaysInfo] = await DateTracker.create(
        [{ date: today, status: 'ACTIVE_DAY', dateFor: 'TEACHER' }],
        { session }
      );

      if (!newDaysInfo) throw new Error('Could not track the day, try again');
    }

    await session.commitTransaction();
    await session.endSession();

    sendSuccessResponse(res, {
      status: 200,
      message: 'Attendances Added Successfully',
      data: attendances,
    });
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(error.message, 400);
  }
});
