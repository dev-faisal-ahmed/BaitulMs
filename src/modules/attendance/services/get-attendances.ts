import { DateTrackerModel } from '../../date-tracker/model';
import { StudentModel } from '../../student/model';
import { TStudentAttendanceInfo } from '../interface';
import { AttendanceModel } from '../model';

export const GetAttendances = async (query: Record<string, any>) => {
  const days = Number(query.days) || 30;
  const dbQuery: Record<string, any> = {};
  const daysInfo = await DateTrackerModel.getDatesByRange(days);

  // for a particular student
  if (query.studentId) {
    const attendances = await AttendanceModel.getAttendanceByStudentId(
      daysInfo,
      query.studentId,
      days
    );

    return attendances;
  }

  // for a particular class
  if (query.arabic) dbQuery['class.arabic'] = query.arabic;
  if (query.general) dbQuery['class.general'] = query.general;

  const students = await StudentModel.find(dbQuery, { _id: 1 });
  const studentIds = students.map(({ _id }) => _id);
  const attendances: TStudentAttendanceInfo[] = [];

  for (const _id of studentIds) {
    const studentAttendanceInfo =
      await AttendanceModel.getAttendanceByStudentId(daysInfo, _id, days);

    attendances.push(studentAttendanceInfo);
  }

  return attendances;
};
