import { z } from 'zod';
import { Sections } from './constants';
import { DateGenerator, EnumGenerator } from '../utils/helpers';

export const SDate = DateGenerator('Date is required', 'Invalid Date');

export const SAddress = z.object({
  villageOrStreetAddress: z.string({
    required_error: 'Village or street address is required',
  }),
  postOffice: z.string({ required_error: 'Post office is required' }),
  thana: z.string({ required_error: 'Thana is required' }),
  district: z.string({ required_error: 'District is required' }),
});

export const SSection = EnumGenerator(
  Sections,
  `Section is required and it has to be "${Sections}"`
);
