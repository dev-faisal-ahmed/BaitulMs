import { Schema, model } from 'mongoose';
import { TExam, TExamSubject } from './interface';
import { ExamStatuses } from './constants';
import { TClass } from '../../global/types';

const ExamSubjectSubSchema = new Schema<TExamSubject>(
  {
    name: { type: String, required: true },
    fullMarks: { type: Number, required: true },
  },
  { _id: false }
);

const ClassSubSchema = new Schema<TClass>(
  {
    arabic: { type: String },
    general: { type: String },
  },
  { _id: false }
);

const ExamSchema = new Schema<TExam>({
  name: { type: String, required: true },
  year: { type: String, required: true },
  status: { type: String, enum: ExamStatuses, default: 'UPCOMING' },
  percentile: { type: Number, required: true },
  subjects: { type: [ExamSubjectSubSchema], required: true },
  class: { type: ClassSubSchema, required: true },
});

export const Exam = model<TExam>('exam', ExamSchema);
