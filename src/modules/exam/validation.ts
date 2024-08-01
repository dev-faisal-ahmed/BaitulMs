import { z } from 'zod';

const SAddExam = z.object({
  name: z.string({ required_error: 'Name is required' }),
  fullMarks: z.number({ required_error: 'Full Marks is required' }),
  year: z.string({ required_error: 'Full Marks is required' }),
});

export const ExamValidation = { SAddExam };

export type TAddExamPayload = z.infer<typeof SAddExam>;
