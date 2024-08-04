import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middleware';
import { ExamSubjectValidation } from './validation';
import { ExamSubjectController } from './controllers';

export const ExamSubjectsRouter = Router();
export const ExamSubjectRouter = Router();

// ExamSubjects
ExamSubjectsRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(ExamSubjectValidation.SAddExamSubjects),
  ExamSubjectController.AddExamSubjects
);

// ExamSubjectRouter
ExamSubjectRouter.patch(
  '/:examSubjectId',
  AuthGuard('ADMIN'),
  ValidationHandler(ExamSubjectValidation.SUpdateExamSubject),
  ExamSubjectController.UpdateExamSubject
);

ExamSubjectRouter.delete(
  '/:examSubjectId',
  AuthGuard('ADMIN'),
  ExamSubjectController.DeleteExamSubject
);
