import { z } from 'zod';
import { StudentTypes } from './constants';
import { BloodGroups, Sections } from '../../global/constants';
import { SAddress, SDate, SSection } from '../../global/validation';

const SName = z.object({
  bengaliName: z.string({ required_error: 'Bengali name is required' }),
  englishName: z.string({ required_error: 'English name is required' }),
});

const SStudentType = z.enum([...(StudentTypes as [string, ...string[]])], {
  required_error: `Section is required and it has to be ${Sections}`,
});

const SStudentClass = z.object({
  arabic: z.string({ required_error: 'Arabic Class Name is required' }),
  general: z.string({ required_error: 'General Class name is required' }),
});

const SBloodGroup = z.enum([...(BloodGroups as [string, ...string[]])], {
  required_error: `Section is required and it has to be ${Sections}`,
});

const SPerson = z.object({
  name: z.string({ required_error: 'Name is required' }),
  phone: z.string({ required_error: 'Phone is required' }),
  nid: z.string({ required_error: 'Nid is required' }),
});

const SParents = z.object({
  father: SPerson,
  mother: SPerson,
});

const SGuardian = z.object({
  name: z.string({ required_error: 'Name is required' }),
  relation: z.string({
    required_error: 'Relation between student and guarding is not provided',
  }),
  address: z.string({ required_error: 'Address is required' }),
  nid: z.string({ required_error: 'Nid is required' }),
  number: z.string({ required_error: 'Phone number is required' }),
});

const SCreateStudent = z.object({
  birthCertification: z.string({
    required_error: 'Birth certificate is required',
  }),
  name: SName,
  section: SSection,
  type: SStudentType,
  image: z.string({ required_error: 'Student image is required' }),
  class: SStudentClass,
  dateOfBirth: SDate,
  bloodGroup: SBloodGroup,
  parents: SParents,
  guardian: SGuardian,
  address: SAddress,
});

export const StudentValidation = { SCreateStudent };

export type TCreateStudentPayload = z.infer<typeof SCreateStudent>;
