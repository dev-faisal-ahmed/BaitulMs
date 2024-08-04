import {
  TransactionRouter,
  TransactionsRouter,
} from '../modules/transaction/router';
import { Router } from 'express';
import { StudentRouter } from '../modules/student/router';
import { TeacherRouter } from '../modules/teacher/router';
import { ExpenseCategoryRouter } from '../modules/expense.category/router';
import { AttendancesRouter } from '../modules/attendance/router';
import { ExamRouter } from '../modules/exam/router';
import { ResultRouter } from '../modules/result/router';
import { AuthRouter } from '../modules/auth/router';
import { SubjectRouter } from '../modules/subject/router';
import { ExamSubjectsRouter } from '../modules/exam.subject/router';

export const AppRouter = Router();

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/student', StudentRouter);
AppRouter.use('/teacher', TeacherRouter);
AppRouter.use('/transaction', TransactionRouter);
AppRouter.use('/transactions', TransactionsRouter);
AppRouter.use('/expense-category', ExpenseCategoryRouter);
AppRouter.use('/attendances', AttendancesRouter);
AppRouter.use('/exam', ExamRouter);
AppRouter.use('/exam/subjects', ExamSubjectsRouter);
AppRouter.use('/result', ResultRouter);
AppRouter.use('/subject', SubjectRouter);
