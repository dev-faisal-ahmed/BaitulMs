import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middleware';
import { NoticeValidation } from './validation';
import { NoticeController } from './controllers';

export const NoticeRouter = Router();

NoticeRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(NoticeValidation.SAddNotice),
  NoticeController.AddNotice
);
