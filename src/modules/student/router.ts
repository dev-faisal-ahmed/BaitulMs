import { Router } from 'express';
import { StudentValidation } from './validation';
import { StudentController } from './controllers';
import { AuthGuard, ValidationHandler } from '../../middleware';

export const StudentRouter = Router();
export const StudentsRouter = Router();

// student router
StudentRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(StudentValidation.SAddStudent),
  StudentController.AddStudent
);

StudentRouter.get(
  '/:studentId',
  AuthGuard('ADMIN'),
  StudentController.GetStudentInfo
);

// students router
StudentsRouter.get('/', AuthGuard('ADMIN'), StudentController.GetStudents);
