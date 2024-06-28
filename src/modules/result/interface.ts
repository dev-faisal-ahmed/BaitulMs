import { Schema } from 'mongoose';

export type TResult = {
  _id: Schema.Types.ObjectId;
  examId: Schema.Types.ObjectId;
  studentId: Schema.Types.ObjectId;
  subjectId: Schema.Types.ObjectId;
  obtainedMark: number;
};
