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
  AuthGuard('ADMIN', 'STUDENT'),
  StudentController.GetStudentInfo
);
StudentRouter.get(
  '/:studentId/payment',
  AuthGuard('ADMIN', 'STUDENT'),
  StudentController.GetPaymentsByStudentId
);

StudentRouter.get(
  '/:studentId/payment/due',
  AuthGuard('ADMIN', 'STUDENT'),
  StudentController.GetDuePaymentInfo
);

// students router
StudentsRouter.get('/', AuthGuard('ADMIN'), StudentController.GetStudents);
