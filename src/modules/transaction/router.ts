import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middleware';
import { TransactionValidation } from './validation';
import { TransactionController } from './controllers';

export const TransactionRouter = Router();
export const TransactionsRouter = Router();

// transaction
TransactionRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(TransactionValidation.SAddTransaction),
  TransactionController.AddTransaction
);

// transactions
TransactionsRouter.get(
  '/',
  AuthGuard('ADMIN'),
  TransactionController.GetTransactions
);
