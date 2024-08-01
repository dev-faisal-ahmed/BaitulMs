import { Router } from 'express';
import { AuthGuard, ValidationHandler } from '../../middleware';
import { ExpenseCategoryValidation } from './validation';
import { ExpenseCategoryController } from './controllers';

export const ExpenseCategoryRouter = Router();

ExpenseCategoryRouter.post(
  '/',
  AuthGuard('ADMIN'),
  ValidationHandler(ExpenseCategoryValidation.SAddExpenseCategory),
  ExpenseCategoryController.AddExpenseCategory
);
