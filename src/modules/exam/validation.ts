import { z } from 'zod';

// sub schema
const SSubject = z.object({
  name: z.string({ required_error: 'Subject Name is required' }),
  fullMarks: z
    .number({
      required_error: 'Full Marks of this subject is required',
    })
    .min(0, { message: 'Full Marks can not be less than zero' }),
});

const SAddExam = z.object({
  name: z.string({ required_error: 'Name is required' }),
  year: z.string({ required_error: 'Full Marks is required' }),
  percentile: z
    .number({ required_error: 'Percentile is required' })
    .min(0, { message: 'It can not be less than zero' })
    .max(100, { message: 'It can not be more than 100' }),

  subjects: SSubject.array(),
});

export const ExamValidation = { SAddExam };

export type TAddExamPayload = z.infer<typeof SAddExam>;
