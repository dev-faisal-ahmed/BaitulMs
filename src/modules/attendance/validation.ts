import { z } from 'zod';

const AddAttendances = z.object({
  studentIds: z.string({ required_error: 'Student Id required' }).array(),
});

export const AttendanceValidation = { AddAttendances };

export type TAddAttendancesPayload = z.infer<typeof AddAttendances>;
