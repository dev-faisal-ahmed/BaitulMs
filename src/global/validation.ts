import { z } from 'zod';
import { IsValidDate } from '../utils/helpers/helper';
import { Sections } from './constants';

export const SDate = z
  .string({ required_error: 'Date is required' })
  .refine((date) => IsValidDate(date), { message: 'Invalid Date' });

export const SAddress = z.object({
  villageOrStreetAddress: z.string({
    required_error: 'Village or street address is required',
  }),
  postOffice: z.string({ required_error: 'Post office is required' }),
  thana: z.string({ required_error: 'Thana is required' }),
  district: z.string({ required_error: 'District is required' }),
});

export const SSection = z.enum([...(Sections as [string, ...string[]])], {
  required_error: `Section is required and it has to be ${Sections}`,
});
