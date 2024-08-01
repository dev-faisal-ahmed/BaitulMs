import { Router } from 'express';
import { ValidationHandler, AuthGuard } from '../../middleware';
import { AttendanceValidation } from './validation';
import { AttendanceController } from './controllers';

export const AttendancesRouter = Router();

AttendancesRouter.post(
  '/',
  AuthGuard('ADMIN', 'TEACHER'),
  ValidationHandler(AttendanceValidation.SAddAttendances),
  AttendanceController.AddAttendances
);

AttendancesRouter.get(
  '/',
  AuthGuard('ADMIN', 'TEACHER'),
  AttendanceController.GetAttendances
);
