import { model, Schema } from 'mongoose';
import { TExamSubject } from './interface';
import { ClassSubSchema } from '../../global/schema';

const ExamSubjectSchema = new Schema<TExamSubject>({
  examId: { type: Schema.Types.ObjectId, ref: 'exam', required: true },
  name: { type: String, required: true },
  class: { type: ClassSubSchema, required: true },
  fullMarks: { type: Number, required: true, min: 0 },
});

export const ExamSubject = model<TExamSubject>(
  'exam-subject',
  ExamSubjectSchema
);
