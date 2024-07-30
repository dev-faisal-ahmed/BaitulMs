import { z } from 'zod';
import { IsValidDate } from '.';

export const EnumGenerator = (options: string[], required_error: string) => {
  return z.enum([...(options as [string, ...string[]])], { required_error });
};

export const DateGenerator = (required_error: string, message: string) => {
  return z
    .string({ required_error })
    .refine((date) => IsValidDate(date), { message });
};
