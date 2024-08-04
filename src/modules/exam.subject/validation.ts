import { z } from 'zod';

// sub schema
const SClass = z.object({
  general: z.string({ required_error: 'General Class name is required' }),
  arabic: z.string({ required_error: 'Arabic Class name is required' }),
});

// main
const SAddExamSubjects = z.object({
  subjects: z
    .object(
      {
        name: z.string({ required_error: 'Subject Name is required' }),
        examId: z.string({ required_error: 'ExamId is required' }),
        fullMarks: z
          .number({ required_error: 'Full Marks is required' })
          .min(0, { message: 'Min Value is 0' }),
        class: SClass,
      },
      { required_error: 'Subjects Required' }
    )
    .array(),
});

const SUpdateExamSubject = z.object({
  name: z.string().optional(),
  class: SClass.optional(),
  fullMarks: z.number().min(0, { message: 'Min Value is 0' }).optional(),
});

export const ExamSubjectValidation = { SAddExamSubjects, SUpdateExamSubject };

export type TAddExamSubjectsPayload = z.infer<typeof SAddExamSubjects>;
export type TUpdateExamSubjectPayload = z.infer<typeof SUpdateExamSubject>;
