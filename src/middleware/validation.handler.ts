import { AnyZodObject } from 'zod';
import { TryCatch } from '../utils';

export const ValidationHandler = (schema: AnyZodObject) => {
  return TryCatch(async (req, _, next) => {
    const payload = await schema.parseAsync(req.body);
    req.body = payload;
    next();
  });
};
