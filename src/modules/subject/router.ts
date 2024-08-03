import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middleware';
import { SubjectValidation } from './validation';
import { SubjectController } from './controllers';

export const SubjectRouter = Router();

SubjectRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(SubjectValidation.SAddSubject),
  SubjectController.AddSubject
);
