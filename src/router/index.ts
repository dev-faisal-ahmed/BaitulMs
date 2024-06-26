import { Router } from 'express';
import { StudentRouter } from '../modules/student/router';
import { TeacherRouter } from '../modules/teacher/router';
import { TransactionRouter } from '../modules/transaction/router';
import { ExpenseCategoryRouter } from '../modules/expense-category/router';

export const AppRouter = Router();

AppRouter.use('/student', StudentRouter);
AppRouter.use('/teacher', TeacherRouter);
AppRouter.use('/transaction', TransactionRouter);
AppRouter.use('/expense-category', ExpenseCategoryRouter);
