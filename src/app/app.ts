import express from 'express';
import cors from 'cors';
import { AppRouter } from './router';
import { GlobalErrorHandler } from '../middleware';

export const App = express();

App.use(express.json());
App.use(cors());

App.use('/api/v1', AppRouter);

App.get('/', (_, res) => {
  res.status(200).json({ ok: true, message: 'Welcome To Baitul-Ms API' });
});

App.all('*', (_, res) => {
  res.status(404).json({ ok: false, message: 'This path does not exist' });
});

App.use(GlobalErrorHandler);
