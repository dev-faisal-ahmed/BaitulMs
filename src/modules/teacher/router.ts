import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middleware';
import { TeacherValidation } from './validation';
import { TeacherController } from './controllers';

export const TeacherRouter = Router();

TeacherRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(TeacherValidation.SAddTeacher),
  TeacherController.AddTeacher
);
