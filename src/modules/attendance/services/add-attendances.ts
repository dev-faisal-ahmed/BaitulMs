import { AttendanceModel } from '../model';
import { TAddAttendancesPayload } from '../validation';

export const AddAttendances = async (payload: TAddAttendancesPayload) => {
  const studentIds = payload.studentIds.reduce(
    (acc: { studentId: string }[], studentId) => {
      acc.push({ studentId });
      return acc;
    },
    []
  );

  const attendances = await AttendanceModel.insertMany(studentIds);
  return attendances;
};
