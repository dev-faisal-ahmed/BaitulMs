import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { ResultValidation } from './validation';
import { ResultController } from './controller';

export const ResultRouter = Router();

ResultRouter.post(
  '/',
  ValidationHandler(ResultValidation.AddResult),
  ResultController.AddResult
);
