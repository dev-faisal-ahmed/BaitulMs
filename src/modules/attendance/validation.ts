import { z } from 'zod';

const SAddStudentAttendances = z.object({
  studentIds: z.string({ required_error: 'Student Id required' }).array(),
});

const SAddTeacherAttendances = z.object({
  teacherIds: z.string({ required_error: 'Teacher Id required' }).array(),
});

export const AttendanceValidation = {
  SAddStudentAttendances,
  SAddTeacherAttendances,
};

export type TAddStudentAttendancesPayload = z.infer<
  typeof SAddStudentAttendances
>;

export type TAddTeacherAttendancesPayload = z.infer<
  typeof SAddTeacherAttendances
>;
