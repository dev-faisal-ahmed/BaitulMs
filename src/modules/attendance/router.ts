import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { AttendanceValidation } from './validation';
import { AttendanceController } from './controller';
import { AuthGuard } from '../../middleware/auth-guard';

export const AttendancesRouter = Router();

AttendancesRouter.post(
  '/',
  AuthGuard('ADMIN', 'TEACHER'),
  ValidationHandler(AttendanceValidation.AddAttendances),
  AttendanceController.AddAttendances
);

AttendancesRouter.get(
  '/:class',
  AuthGuard('ADMIN', 'TEACHER'),
  AttendanceController.GetAttendanceByClass
);
