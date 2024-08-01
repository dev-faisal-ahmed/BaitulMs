import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middleware';
import { ResultValidation } from './validation';
import { ResultController } from './controllers';

export const ResultRouter = Router();

ResultRouter.post(
  '/',
  AuthGuard('ADMIN', 'TEACHER'),
  ValidationHandler(ResultValidation.SAddResult),
  ResultController.AddResult
);
