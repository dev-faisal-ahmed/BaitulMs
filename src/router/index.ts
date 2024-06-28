import { Router } from 'express';
import { StudentRouter } from '../modules/student/router';
import { TeacherRouter } from '../modules/teacher/router';
import { TransactionRouter } from '../modules/transaction/router';
import { ExpenseCategoryRouter } from '../modules/expense-category/router';
import { AttendancesRouter } from '../modules/attendance/router';
import { ExamRouter } from '../modules/exam/router';

export const AppRouter = Router();

AppRouter.use('/student', StudentRouter);
AppRouter.use('/teacher', TeacherRouter);
AppRouter.use('/transaction', TransactionRouter);
AppRouter.use('/expense-category', ExpenseCategoryRouter);
AppRouter.use('/attendances', AttendancesRouter);
AppRouter.use('/exam', ExamRouter);
