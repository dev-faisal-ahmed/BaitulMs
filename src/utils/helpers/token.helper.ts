import { sign } from 'jsonwebtoken';
import { TAuth } from '../../global/types';
import { JWT_SECRET } from '../../config';

export const generateAuthToken = (payload: TAuth) => {
  const token = sign(payload, JWT_SECRET!, { expiresIn: '30d' });
  return token;
};
