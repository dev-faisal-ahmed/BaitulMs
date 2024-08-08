import {
  generateDates,
  getDayRange,
  sendSuccessResponse,
} from '../../../helpers';
import { TryCatch } from '../../../utils';
import { TGrantTeacherLeave } from '../validation';
import { DateTracker } from '../../date.tracker/model';
import { Attendance } from '../model';

export const GrantTeacherLeave = TryCatch(async (req, res) => {
  const { teacherId, startDate, endDate }: TGrantTeacherLeave = req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const dates = generateDates(start, end);
  const leaves = [];

  for (const date of dates) {
    const { startOfDay, endOfDay } = getDayRange(date);
    const dateQuery = { date: { $gte: startOfDay, $lte: endOfDay } };

    // if Friday
    if (date.getDay() === 5) {
      leaves.push(`${startOfDay.toISOString()} : HOLIDAY(FRIDAY)`);
      continue;
    }

    const dateInfo = await DateTracker.findOne({
      ...dateQuery,
      dateFor: 'TEACHER',
    });

    // if holiday
    if (dateInfo && dateInfo.status === 'HOLIDAY') {
      leaves.push(`${startOfDay.toISOString()} : HOLIDAY`);
      continue;
    }

    const attendanceInfo = await Attendance.findOne({
      ...dateQuery,
      teacherId,
    });

    // checking if already present or already in leave
    if (attendanceInfo) {
      leaves.push(
        `${startOfDay.toISOString()} : ALREADY ${attendanceInfo.status}`
      );
      continue;
    }

    const result = await Attendance.create({
      teacherId,
      date,
      status: 'IN_LEAVE',
    });

    if (!result) {
      leaves.push(`${startOfDay.toISOString()} : FAILED_TO_GRANT_LEAVE`);
      continue;
    }
    leaves.push(`${startOfDay.toISOString()} : LEAVE_GRANTED`);
  }

  sendSuccessResponse(res, {
    status: 200,
    message: 'Leave Granted Successfully',
    data: leaves,
  });
});
