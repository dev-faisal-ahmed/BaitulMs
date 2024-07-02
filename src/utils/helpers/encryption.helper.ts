import bcrypt from 'bcrypt';
import { BCRYPT_SALT } from '../../config';

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);
  return hashedPassword;
};

export const matchPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatch;
};
