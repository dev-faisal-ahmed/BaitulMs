import mongoose from 'mongoose';
import { AttendanceModel } from '../model';
import { TAddAttendancesPayload } from '../validation';
import { DateTrackerModel } from '../../date-tracker/model';

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
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (todaysInfo && todaysInfo.status === 'HOLIDAY')
      throw new Error('Today is holiday');

    const studentIds = payload.studentIds.reduce(
      (acc: { studentId: string }[], studentId) => {
        acc.push({ studentId });
        return acc;
      },
      []
    );

    const attendances = await AttendanceModel.insertMany(studentIds, {
      session,
    });

    if (!attendances.length) throw new Error('Failed to add attendance!');

    if (!todaysInfo) {
      const [newDaysInfo] = await DateTrackerModel.create(
        [{ date: today, status: 'ACTIVE_DAY' }],
        { session }
      );

      if (!newDaysInfo) throw new Error('Could not track the day, try again');
    }

    await session.commitTransaction();
    await session.endSession();

    return attendances;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};