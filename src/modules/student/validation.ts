import { z } from 'zod';
import { BloodGroups, Sections, StudentTypes } from './constants';
import { IsValidDate } from '../../utils/helpers/helper';

const SName = z.object({
  bengaliName: z.string(),
  englishName: z.string(),
});

const SSection = z.enum([...(Sections as [string, ...string[]])], {
  required_error: `Section is required and it has to be ${Sections}`,
});

const SStudentType = z.enum([...(StudentTypes as [string, ...string[]])], {
  required_error: `Section is required and it has to be ${Sections}`,
});

const SStudentClass = z.object({
  arabic: z.string(),
  general: z.string(),
});

const SDob = z
  .string()
  .refine((date) => IsValidDate(date), { message: 'Invalid Date' });

const SBloodGroup = z.enum([...(BloodGroups as [string, ...string[]])], {
  required_error: `Section is required and it has to be ${Sections}`,
});

const SPerson = z.object({
  name: z.string(),
  phone: z.string(),
  nid: z.string(),
});

const SParents = z.object({
  father: SPerson,
  mother: SPerson,
});

const SGuardian = z.object({
  name: z.string(),
  relation: z.string(),
  address: z.string(),
  nid: z.string(),
  number: z.string(),
});

const SAddress = z.object({
  villageOrStreetAddress: z.string(),
  postOffice: z.string(),
  thana: z.string(),
  district: z.string(),
});

const SCreateStudent = z.object({
  birthCertification: z.string(),
  name: SName,
  section: SSection,
  type: SStudentType,
  image: z.string(),
  class: SStudentClass,
  dateOfBirth: SDob,
  bloodGroup: SBloodGroup,
  parents: SParents,
  guardian: SGuardian,
  address: SAddress,
});

export const StudentValidation = { SCreateStudent };

export type TCreateStudentPayload = z.infer<typeof SCreateStudent>;
