import { z } from 'zod';
import { isValidDate } from './general.helper';

export const enumGenerator = (options: string[], required_error: string) => {
  return z.enum([...(options as [string, ...string[]])], { required_error });
};

export const dateGenerator = (required_error: string, message: string) => {
  return z
    .string({ required_error })
    .refine((date) => isValidDate(date), { message });
};
