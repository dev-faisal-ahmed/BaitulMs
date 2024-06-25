import { Router } from 'express';
import { StudentRouter } from '../modules/student/router';

export const AppRouter = Router();

AppRouter.use('/student', StudentRouter);
