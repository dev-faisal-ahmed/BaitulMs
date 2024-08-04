import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middleware';
import { ExamSubjectValidation } from './validation';
import { ExamSubjectController } from './controllers';

export const ExamSubjectsRouter = Router();

// ExamSubjects
ExamSubjectsRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(ExamSubjectValidation.SAddExamSubjects),
  ExamSubjectController.AddExamSubjects
);
