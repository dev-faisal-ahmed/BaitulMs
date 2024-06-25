import { z } from 'zod';
import { SAddress, SDate, SSection } from '../../global/validation';

const SAddTeacher = z.object({
  name: z.string({ required_error: 'Name is required' }),
  nid: z.string({ required_error: 'Nid is required' }),
  number: z.string({ required_error: 'Phone Number is required' }),
  section: SSection,
  salary: z.number({ required_error: 'Salary is required' }),
  dateOfBirth: SDate,
  dateOfJoining: SDate,
  nationality: z.string({ required_error: 'Nationality is required' }),
  image: z.string({ required_error: 'Image is required' }),
  address: z.object({
    present: SAddress,
    permanent: SAddress,
  }),
});

export const TeacherValidation = { SAddTeacher };

export type TAddTeacherPayload = z.infer<typeof SAddTeacher>;
