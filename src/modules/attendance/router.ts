import { Router } from 'express';
import { ValidationHandler, AuthGuard } from '../../middleware';
import { AttendanceValidation } from './validation';
import { AttendanceController } from './controllers';

export const AttendancesRouter = Router();
export const AttendanceRouter = Router();

// attendances
AttendancesRouter.post(
  '/student',
  AuthGuard('ADMIN', 'TEACHER'),
  ValidationHandler(AttendanceValidation.SAddStudentAttendances),
  AttendanceController.AddStudentAttendances
);

AttendancesRouter.post(
  '/teacher',
  AuthGuard('ADMIN'),
  ValidationHandler(AttendanceValidation.SAddTeacherAttendances),
  AttendanceController.AddTeacherAttendances
);

AttendancesRouter.get(
  '/student',
  AuthGuard('ADMIN', 'TEACHER'),
  AttendanceController.GetStudentAttendances
);

// attendance
AttendanceRouter.post(
  '/teacher/leave',
  AuthGuard('ADMIN'),
  ValidationHandler(AttendanceValidation.SGrantTeacherLeave),
  AttendanceController.GrantTeacherLeave
);
