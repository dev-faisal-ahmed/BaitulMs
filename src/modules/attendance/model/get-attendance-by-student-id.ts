import { Schema } from 'mongoose';
import { TDateTracker } from '../../date-tracker/interface';
import { TAttendance, TAttendancesInfo } from '../interface';
import { StudentModel } from '../../student/model';

export async function getAttendanceByStudentId(
  this: any,
  daysInfo: TDateTracker[],
  studentId: Schema.Types.ObjectId,
  days: number
) {
  const studentInfo = await StudentModel.findOne(
    { _id: studentId },
    { name: 1, studentId: 1, section: 1, image: 1, class: 1 }
  );

  const today = new Date();
  const startDay = new Date();
  startDay.setDate(today.getDate() - days);

  const studentAttendancesInfo: TAttendance[] = await this.find({
    studentId,
    date: { $gte: startDay, $lte: today },
  }).sort({ date: 1 });

  const attendances: TAttendancesInfo[] = [];

  for (let i = 0; i <= days; i++) {
    const currentDay = new Date(startDay);

    currentDay.setDate(startDay.getDate() + i);

    const [currentDayStr] = currentDay.toISOString().split('T');
    const dayInfo = daysInfo.find(
      (day) => day.date.toISOString().split('T')[0] === currentDayStr
    );

    if (!dayInfo) continue;

    if (dayInfo.status === 'HOLIDAY') {
      attendances.push({ date: currentDay, status: 'HOLIDAY' });
      continue;
    }

    const studentAttendanceInfo = studentAttendancesInfo.find(
      (day) => day.date.toISOString().split('T')[0] === currentDayStr
    );

    if (dayInfo.status === 'ACTIVE_DAY') {
      if (studentAttendanceInfo?.status === 'PRESENT')
        attendances.push({ date: currentDay, status: 'PRESENT' });
      else if (studentAttendanceInfo?.status === 'IN_LEAVE')
        attendances.push({ date: currentDay, status: 'IN_LEAVE' });
      else attendances.push({ date: currentDay, status: 'ABSENT' });
    }
  }

  return { studentInfo, attendances };
}
