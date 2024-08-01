import { Router } from 'express';
import { ValidationHandler, AuthGuard } from '../../middleware';
import { AuthValidation } from './validation';
import { AuthController } from './controllers';

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
