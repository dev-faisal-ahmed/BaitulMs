import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { AuthValidation } from './validation';
import { AuthController } from './controller';

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
