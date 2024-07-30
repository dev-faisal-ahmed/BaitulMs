import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { AttendanceValidation } from './validation';
import { AuthGuard } from '../../middleware/auth.guard';
import { AttendanceController } from './controllers';

export const AttendancesRouter = Router();

AttendancesRouter.post(
  '/',
  AuthGuard('ADMIN', 'TEACHER'),
  ValidationHandler(AttendanceValidation.AddAttendances),
  AttendanceController.AddAttendances
);

AttendancesRouter.get(
  '/',
  AuthGuard('ADMIN', 'TEACHER'),
  AttendanceController.GetAttendances
);
