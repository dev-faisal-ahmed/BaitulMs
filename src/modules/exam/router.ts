import { Router } from 'express';
import { ValidationHandler, AuthGuard } from '../../middleware';
import { ExamValidation } from './validation';
import { ExamController } from './controllers';

export const ExamRouter = Router();

ExamRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(ExamValidation.SAddExam),
  ExamController.AddExam
);
