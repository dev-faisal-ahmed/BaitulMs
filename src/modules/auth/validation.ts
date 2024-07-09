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

const SChangePassword = z.object({
  oldPassword: z.string({ required_error: 'Old password is required' }),
  newPassword: z.string({ required_error: 'New password is required' }),
});

export const AuthValidation = { SLogin, SAdminLogin, SChangePassword };

export type TLoginPayload = z.infer<typeof SLogin>;
export type TAdminLoginPayload = z.infer<typeof SAdminLogin>;
export type TChangePasswordPayload = z.infer<typeof SChangePassword>;
