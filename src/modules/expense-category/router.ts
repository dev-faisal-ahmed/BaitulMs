import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation.handler';
import { ExpenseCategoryValidation } from './validation';
import { ExpenseCategoryController } from './controller';

export const ExpenseCategoryRouter = Router();

ExpenseCategoryRouter.post(
  '/',
  ValidationHandler(ExpenseCategoryValidation.AddExpenseCategory),
  ExpenseCategoryController.AddExpenseCategory
);
