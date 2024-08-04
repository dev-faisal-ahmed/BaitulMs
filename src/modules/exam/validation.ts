import { z } from 'zod';
import { enumGenerator } from '../../helpers';
import { ExamStatuses } from './constants';

// sub schema
const SPercentile = z
  .number({ required_error: 'Percentile is required' })
  .min(0, { message: 'It can not be less than zero' })
  .max(100, { message: 'It can not be more than 100' });

// main schema
const SAddExam = z.object({
  name: z.string({ required_error: 'Name is required' }),
  year: z.string({ required_error: 'Full Marks is required' }),
  percentile: SPercentile,
});

const SUpdateExam = z.object({
  name: z.string().optional(),
  year: z.string().optional(),
  percentile: SPercentile.optional(),
  status: enumGenerator(
    ExamStatuses,
    `Exam Status is required and it has to be ${ExamStatuses}`
  ).optional(),
});

export const ExamValidation = { SAddExam, SUpdateExam };

export type TAddExamPayload = z.infer<typeof SAddExam>;
export type TUpdateExamPayload = z.infer<typeof SUpdateExam>;
