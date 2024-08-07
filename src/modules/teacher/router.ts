import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middleware';
import { TeacherValidation } from './validation';
import { TeacherController } from './controllers';

export const TeacherRouter = Router();
export const TeachersRouter = Router();

// teacher
TeacherRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(TeacherValidation.SAddTeacher),
  TeacherController.AddTeacher
);

TeacherRouter.get(
  '/:teacherId',
  AuthGuard('ADMIN'),
  TeacherController.GetTeacherById
);

// teachers
TeachersRouter.get('/', AuthGuard('ADMIN'), TeacherController.GetTeachers);
