import { Router } from 'express';
import { StudentRouter } from '../modules/student/router';
import { TeacherRouter } from '../modules/teacher/router';

export const AppRouter = Router();

AppRouter.use('/student', StudentRouter);
AppRouter.use('/teacher', TeacherRouter);
