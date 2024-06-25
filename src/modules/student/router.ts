import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { StudentValidation } from './validation';
import { StudentController } from './controller';

export const StudentRouter = Router();

StudentRouter.post(
  '/',
  ValidationHandler(StudentValidation.SCreateStudent),
  StudentController.CreateStudent
);
