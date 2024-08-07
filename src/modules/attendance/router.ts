import { Router } from 'express';
import { ValidationHandler, AuthGuard } from '../../middleware';
import { AttendanceValidation } from './validation';
import { AttendanceController } from './controllers';

export const AttendancesRouter = Router();

AttendancesRouter.post(
  '/student',
  AuthGuard('ADMIN', 'TEACHER'),
  ValidationHandler(AttendanceValidation.SAddStudentAttendances),
  AttendanceController.AddStudentAttendances
);

AttendancesRouter.get(
  '/student',
  AuthGuard('ADMIN', 'TEACHER'),
  AttendanceController.GetStudentAttendances
);
