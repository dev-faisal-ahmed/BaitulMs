import { z } from 'zod';

const AddResult = z.object({
  examId: z.string({ required_error: 'Exam Id Required' }),
  studentId: z.string({ required_error: 'Student Id Required' }),
  subjectId: z.string({ required_error: 'Subject Id Required' }),
  obtainedMark: z.number({ required_error: 'Student Id Required' }),
});

export const ResultValidation = { AddResult };

export type TAddResultPayload = z.infer<typeof AddResult>;
