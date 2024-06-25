import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { TeacherValidation } from './validation';
import { TeacherController } from './controller';

export const TeacherRouter = Router();

TeacherRouter.post(
  '/',
  ValidationHandler(TeacherValidation.SAddTeacher),
  TeacherController.AddTeacher
);
