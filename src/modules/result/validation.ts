import { z } from 'zod';

const SAddResult = z.object({
  examId: z.string({ required_error: 'Exam Id Required' }),
  studentId: z.string({ required_error: 'Student Id Required' }),
  subjectId: z.string({ required_error: 'Subject Id Required' }),
  obtainedMark: z.number({ required_error: 'Student Id Required' }),
});

export const ResultValidation = { SAddResult };

export type TAddResultPayload = z.infer<typeof SAddResult>;
