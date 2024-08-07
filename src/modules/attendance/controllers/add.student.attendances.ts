import mongoose from 'mongoose';
import { AppError, TryCatch } from '../../../utils';
import { DateTracker } from '../../date.tracker/model';
import { Attendance } from '../model';
import { Student } from '../../student/model';
import { getDayRange, sendSuccessResponse } from '../../../helpers';
import { TAddStudentAttendancesPayload } from '../validation';

export const AddStudentAttendances = TryCatch(async (req, res) => {
  const payload: TAddStudentAttendancesPayload = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const today = new Date();
    const { startOfDay, endOfDay } = getDayRange(today);

    const todaysInfo = await DateTracker.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
      dateFor: 'STUDENT',
    });

    if (todaysInfo && todaysInfo.status === 'HOLIDAY')
      throw new Error('Today is holiday');

    const studentIds = payload.studentIds.reduce((acc: string[], studentId) => {
      acc.push(studentId);
      return acc;
    }, []);

    const attendances = [];

    for (const studentId of studentIds) {
      const isAttendanceExist = await Attendance.findOne({
        date: { $gte: startOfDay, $lte: endOfDay },
        studentId,
      });

      const studentInfo = await Student.findOne({ _id: studentId });

      if (isAttendanceExist) {
        attendances.push(
          `ID: ${studentInfo?.studentId} : Already ${isAttendanceExist.status}`
        );

        continue;
      }

      const [attendance] = await Attendance.create(
        [{ studentId, date: new Date() }],
        { session }
      );

      if (attendance)
        attendances.push(`ID: ${studentInfo?.studentId} : Present`);
    }

    if (!todaysInfo) {
      const [newDaysInfo] = await DateTracker.create(
        [{ date: today, status: 'ACTIVE_DAY', dateFor: 'STUDENT' }],
        { session }
      );

      if (!newDaysInfo) throw new Error('Could not track the day, try again');
    }

    await session.commitTransaction();
    await session.endSession();

    sendSuccessResponse(res, {
      status: 200,
      message: 'Attendances added successfully',
      data: attendances,
    });
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(error.message, 400);
  }
});
