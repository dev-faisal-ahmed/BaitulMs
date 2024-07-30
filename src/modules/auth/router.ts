import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { AuthValidation } from './validation';
import { AuthController } from './controllers';
import { AuthGuard } from '../../middleware/auth.guard';

export const AuthRouter = Router();

AuthRouter.post(
  '/login',
  ValidationHandler(AuthValidation.SLogin),
  AuthController.Login
);

AuthRouter.post(
  '/login/admin',
  ValidationHandler(AuthValidation.SAdminLogin),
  AuthController.AdminLogin
);

AuthRouter.patch(
  '/change-password',
  AuthGuard('STUDENT', 'TEACHER'),
  ValidationHandler(AuthValidation.SChangePassword),
  AuthController.ChangePassword
);
