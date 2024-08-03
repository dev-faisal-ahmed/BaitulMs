import { z } from 'zod';

export const SAddSubject = z.object({
  name: z.string({ required_error: "Subject's Name is required" }),
});

export const SubjectValidation = { SAddSubject };
export type TAddSubjectPayload = z.infer<typeof SAddSubject>;
