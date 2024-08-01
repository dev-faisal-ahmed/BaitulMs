import { Schema } from 'mongoose';
import { TryCatch } from '../../../utils';
import { DateTracker } from '../../date.tracker/model';
import { Attendance } from '../model';
import { Student } from '../../student/model';
import { TStudentAttendanceInfo } from '../interface';
import { SendSuccessResponse } from '../../../helpers';

export const GetAttendances = TryCatch(async (req, res) => {
  const { query } = req;
  const days = Number(query.days) || 30;

  const studentId = query.studentId as string;
  const studentIdAsObjectId = new Schema.ObjectId(studentId);
  const dbQuery: Record<string, any> = {};
  const daysInfo = await DateTracker.getDatesByRange(days);

  // for a particular student
  if (studentId) {
    const attendances = await Attendance.getAttendanceByStudentId(
      daysInfo,
      studentIdAsObjectId,
      days
    );

    SendSuccessResponse(res, {
      status: 200,
      message: 'Attendances  Successfully Retrieved',
      data: attendances,
    });
  }

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

  SendSuccessResponse(res, {
    status: 200,
    message: 'Attendances  Successfully Retrieved',
    data: attendances,
  });
});
