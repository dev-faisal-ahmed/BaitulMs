import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { TransactionValidation } from './validation';
import { TransactionController } from './controller';

export const TransactionRouter = Router();

TransactionRouter.post(
  '/',
  ValidationHandler(TransactionValidation.AddTransaction),
  TransactionController.AddTransaction
);
