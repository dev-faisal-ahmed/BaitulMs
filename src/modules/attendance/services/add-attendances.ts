import mongoose from 'mongoose';
import { AttendanceModel } from '../model';
import { TAddAttendancesPayload } from '../validation';
import { DateTrackerModel } from '../../date-tracker/model';
import { StudentModel } from '../../student/model';

export const AddAttendances = async (payload: TAddAttendancesPayload) => {
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

    const todaysInfo = await DateTrackerModel.findOne({
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
      const isAttendanceExist = await AttendanceModel.findOne({
        date: { $gte: startOfDay.toString(), $lte: endOfDay.toString() },
        studentId,
      });

      const studentInfo = await StudentModel.findOne({ _id: studentId });

      if (isAttendanceExist) {
        attendances.push(
          `ID: ${studentInfo?.studentId} : Already ${isAttendanceExist.status}`
        );

        continue;
      }

      const [attendance] = await AttendanceModel.create(
        [{ studentId, date: new Date().toString() }],
        { session }
      );

      if (attendance)
        attendances.push(`ID: ${studentInfo?.studentId} : Present`);
    }

    if (!todaysInfo) {
      const [newDaysInfo] = await DateTrackerModel.create(
        [{ date: today.toString(), status: 'ACTIVE_DAY' }],
        { session }
      );

      if (!newDaysInfo) throw new Error('Could not track the day, try again');
    }

    await session.commitTransaction();
    await session.endSession();

    return attendances;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
  }
};
