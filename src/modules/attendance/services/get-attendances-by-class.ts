import { DateTrackerModel } from '../../date-tracker/model';
import { StudentModel } from '../../student/model';
import { TStudentAttendanceInfo } from '../interface';
import { AttendanceModel } from '../model';

export const GetAttendancesByClass = async (cls: string, days: number) => {
  const students = await StudentModel.find(
    { 'class.general': cls },
    { _id: 1 }
  );

  const studentIds = students.map(({ _id }) => _id);
  const daysInfo = await DateTrackerModel.getDatesByRange(days);

  const attendances: TStudentAttendanceInfo[] = [];

  for (const _id of studentIds) {
    const studentAttendanceInfo =
      await AttendanceModel.getAttendanceByStudentId(daysInfo, _id, days);

    attendances.push(studentAttendanceInfo);
  }

  return attendances;
};
