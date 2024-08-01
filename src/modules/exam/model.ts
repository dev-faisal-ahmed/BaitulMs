import { Schema, model } from 'mongoose';
import { TExam } from './interface';
import { ExamStatuses } from './constants';

const ExamSchema = new Schema<TExam>({
  name: { type: String, required: true },
  fullMarks: { type: Number, required: true },
  year: { type: String, required: true },
  status: { type: String, enum: ExamStatuses, default: 'UPCOMING' },
});

export const Exam = model<TExam>('exam', ExamSchema);
