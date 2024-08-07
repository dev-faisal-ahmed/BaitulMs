import { z } from 'zod';

const SAddStudentAttendances = z.object({
  studentIds: z.string({ required_error: 'Student Id required' }).array(),
});

export const AttendanceValidation = { SAddStudentAttendances };

export type TAddStudentAttendancePayload = z.infer<
  typeof SAddStudentAttendances
>;
