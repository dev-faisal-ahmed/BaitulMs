import mongoose from 'mongoose';
import { TryCatch } from '../../../utils/try-catch';
import { TAddAttendancesPayload } from '../validation';
import { DateTracker } from '../../date-tracker/model';
import { Attendance } from '../model';
import { Student } from '../../student/model';
import { SendSuccessResponse } from '../../../helpers';

export const AddAttendances = TryCatch(async (req, res) => {
  const payload: TAddAttendancesPayload = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const todaysInfo = await DateTracker.findOne({
      date: { $gte: startOfDay.toString(), $lte: endOfDay.toString() },
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
        date: { $gte: startOfDay.toString(), $lte: endOfDay.toString() },
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
        [{ studentId, date: new Date().toString() }],
        { session }
      );

      if (attendance)
        attendances.push(`ID: ${studentInfo?.studentId} : Present`);
    }

    if (!todaysInfo) {
      const [newDaysInfo] = await DateTracker.create(
        [{ date: today.toString(), status: 'ACTIVE_DAY' }],
        { session }
      );

      if (!newDaysInfo) throw new Error('Could not track the day, try again');
    }

    await session.commitTransaction();
    await session.endSession();

    SendSuccessResponse(res, {
      status: 200,
      message: 'Attendances added successfully',
      data: attendances,
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
});
