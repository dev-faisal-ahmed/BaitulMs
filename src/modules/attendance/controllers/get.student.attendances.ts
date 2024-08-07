import { Schema } from 'mongoose';
import { TryCatch } from '../../../utils';
import { DateTracker } from '../../date.tracker/model';
import { Attendance } from '../model';
import { Student } from '../../student/model';
import { TStudentAttendanceInfo } from '../interface';
import { sendSuccessResponse } from '../../../helpers';

export const GetStudentAttendances = TryCatch(async (req, res) => {
  const { query } = req;
  const days = Number(query.days) || 30;
  const dbQuery: Record<string, any> = {};
  const daysInfo = await DateTracker.getDatesByRange({ type: 'DAYS', days });

  // for a particular class
  if (query.arabic) dbQuery['class.arabic'] = query.arabic;
  if (query.general) dbQuery['class.general'] = query.general;

  const students = await Student.find(dbQuery, { _id: 1 });
  const studentIds = students.map(({ _id }) => _id);
  const attendances: TStudentAttendanceInfo[] = [];

  for (const _id of studentIds) {
    const studentAttendanceInfo = await Attendance.getAttendanceByStudentId(
      daysInfo,
      _id,
      days
    );

    attendances.push(studentAttendanceInfo);
  }

  sendSuccessResponse(res, {
    status: 200,
    message: 'Attendances  Successfully Retrieved',
    data: attendances,
  });
});
