import { Schema, model } from 'mongoose';
import { TResult } from './interface';

const ResultSchema = new Schema<TResult>(
  {
    examId: { type: Schema.Types.ObjectId, required: true, ref: 'exam' },
    studentId: { type: Schema.Types.ObjectId, required: true, ref: 'student' },
    subjectId: { type: Schema.Types.ObjectId, required: true, ref: 'subject' },
    obtainedMark: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Result = model('result', ResultSchema);
