import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { AttendanceValidation } from './validation';
import { AttendanceController } from './controller';

export const AttendancesRouter = Router();

AttendancesRouter.post(
  '/',
  ValidationHandler(AttendanceValidation.AddAttendances),
  AttendanceController.AddAttendances
);
