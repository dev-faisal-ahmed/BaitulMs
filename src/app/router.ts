import {
  TransactionRouter,
  TransactionsRouter,
} from '../modules/transaction/router';
import {
  ExamSubjectRouter,
  ExamSubjectsRouter,
} from '../modules/exam.subject/router';
import {
  AttendanceRouter,
  AttendancesRouter,
} from '../modules/attendance/router';
import { Router } from 'express';
import { StudentRouter, StudentsRouter } from '../modules/student/router';
import { TeacherRouter, TeachersRouter } from '../modules/teacher/router';
import { ExpenseCategoryRouter } from '../modules/expense.category/router';
import { ExamRouter } from '../modules/exam/router';
import { ResultRouter } from '../modules/result/router';
import { AuthRouter } from '../modules/auth/router';
import { SubjectRouter } from '../modules/subject/router';

export const AppRouter = Router();

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/student', StudentRouter);
AppRouter.use('/students', StudentsRouter);
AppRouter.use('/teacher', TeacherRouter);
AppRouter.use('/teachers', TeachersRouter);
AppRouter.use('/transaction', TransactionRouter);
AppRouter.use('/transactions', TransactionsRouter);
AppRouter.use('/expense-category', ExpenseCategoryRouter);
AppRouter.use('/attendances', AttendancesRouter);
AppRouter.use('/attendance', AttendanceRouter);
AppRouter.use('/subject', SubjectRouter);
AppRouter.use('/exam', ExamRouter);
AppRouter.use('/exam/subjects', ExamSubjectsRouter);
AppRouter.use('/exam/subject', ExamSubjectRouter);
AppRouter.use('/result', ResultRouter);
