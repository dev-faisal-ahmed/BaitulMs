import { z } from 'zod';
import { enumGenerator } from '../../helpers';
import { ExamStatuses } from './constants';

// sub schema
const SSubject = z.object({
  name: z.string({ required_error: 'Subject Name is required' }),
  fullMarks: z
    .number({
      required_error: 'Full Marks of this subject is required',
    })
    .min(0, { message: 'Full Marks can not be less than zero' }),
});

const SClass = z.object({
  general: z.string({ required_error: 'General Class is required' }),
  arabic: z.string({ required_error: 'Arabic Class is required' }),
});

const SPercentile = z
  .number({ required_error: 'Percentile is required' })
  .min(0, { message: 'It can not be less than zero' })
  .max(100, { message: 'It can not be more than 100' });

const SUpdateSubject = z.object({
  name: z.string({ required_error: 'Old Subject Name is required' }),
  payload: z.object({
    name: z.string().optional(),
    fullMarks: z
      .number()
      .min(0, { message: 'Full Marks can not be less than zero' })
      .optional(),
  }),
});

// main schema
const SAddExam = z.object({
  name: z.string({ required_error: 'Name is required' }),
  year: z.string({ required_error: 'Full Marks is required' }),
  percentile: SPercentile,
  subjects: SSubject.array(),
  class: SClass,
});

const SUpdateExam = z.object({
  name: z.string().optional(),
  year: z.string().optional(),
  percentile: SPercentile.optional(),
  class: SClass.optional(),
  status: enumGenerator(
    ExamStatuses,
    `Exam Status is required and it has to be ${ExamStatuses}`
  ).optional(),
});

const SManageSubject = z.object({
  add: SSubject.array().optional(),
  update: SUpdateSubject.optional(),
  remove: z.string().optional(),
});

export const ExamValidation = { SAddExam, SUpdateExam, SManageSubject };

export type TAddExamPayload = z.infer<typeof SAddExam>;
export type TUpdateExamPayload = z.infer<typeof SUpdateExam>;
export type TManageExamPayload = z.infer<typeof SManageSubject>;
