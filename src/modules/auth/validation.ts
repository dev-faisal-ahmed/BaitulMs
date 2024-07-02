import { z } from 'zod';

const SLogin = z.object({
  userId: z.string({ required_error: 'User Id is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

const SAdminLogin = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
});

export const AuthValidation = { SLogin, SAdminLogin };

export type TLoginPayload = z.infer<typeof SLogin>;
export type TAdminLoginPayload = z.infer<typeof SAdminLogin>;
