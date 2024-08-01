import { Router } from 'express';
import { StudentValidation } from './validation';
import { StudentController } from './controllers';
import { AuthGuard, ValidationHandler } from '../../middleware';

export const StudentRouter = Router();

StudentRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(StudentValidation.SAddStudent),
  StudentController.AddStudent
);
