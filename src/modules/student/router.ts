import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { StudentValidation } from './validation';
import { StudentController } from './controller';
import { AuthGuard } from '../../middleware/auth.guard';

export const StudentRouter = Router();

StudentRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(StudentValidation.SCreateStudent),
  StudentController.CreateStudent
);
