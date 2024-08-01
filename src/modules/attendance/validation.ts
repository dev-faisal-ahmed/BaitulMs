import { z } from 'zod';

const SAddAttendances = z.object({
  studentIds: z.string({ required_error: 'Student Id required' }).array(),
});

export const AttendanceValidation = { SAddAttendances };

export type TAddAttendancesPayload = z.infer<typeof SAddAttendances>;
