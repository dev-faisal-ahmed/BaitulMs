import { z } from 'zod';
import { dateGenerator } from '../../helpers';

const SAddStudentAttendances = z.object({
  studentIds: z.string({ required_error: 'Student Id required' }).array(),
});

const SAddTeacherAttendances = z.object({
  teacherIds: z.string({ required_error: 'Teacher Id required' }).array(),
});

const SGrantTeacherLeave = z.object({
  teacherId: z.string({ required_error: 'Teacher id is required' }),
  startDate: dateGenerator('StartDate is required', 'Invalid Date'),
  endDate: dateGenerator('EndDate is required', 'Invalid Date'),
});

export const AttendanceValidation = {
  SAddStudentAttendances,
  SAddTeacherAttendances,
  SGrantTeacherLeave,
};

export type TAddStudentAttendancesPayload = z.infer<
  typeof SAddStudentAttendances
>;

export type TAddTeacherAttendancesPayload = z.infer<
  typeof SAddTeacherAttendances
>;

export type TGrantTeacherLeave = z.infer<typeof SGrantTeacherLeave>;
