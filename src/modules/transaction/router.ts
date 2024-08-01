import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middleware';
import { TransactionValidation } from './validation';
import { TransactionController } from './controllers';

export const TransactionRouter = Router();

TransactionRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(TransactionValidation.SAddTransaction),
  TransactionController.AddTransaction
);
