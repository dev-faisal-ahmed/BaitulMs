import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { ExamValidation } from './validation';
import { ExamController } from './controller';

export const ExamRouter = Router();

ExamRouter.post(
  '/',
  ValidationHandler(ExamValidation.AddExam),
  ExamController.AddExam
);
