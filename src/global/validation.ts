import { z } from 'zod';
import { BloodGroups, Sections } from './constants';
import { dateGenerator, enumGenerator } from '../helpers';

export const SDate = dateGenerator('Date is required', 'Invalid Date');

export const SAddress = z.object({
  villageOrStreetAddress: z.string({
    required_error: 'Village or street address is required',
  }),
  postOffice: z.string({ required_error: 'Post office is required' }),
  thana: z.string({ required_error: 'Thana is required' }),
  district: z.string({ required_error: 'District is required' }),
});

export const SSection = enumGenerator(
  Sections,
  `Section is required and it has to be "${Sections}"`
);

export const SBloodGroup = enumGenerator(
  BloodGroups,
  `Blood Group is required and it has to be ${BloodGroups}`
);
