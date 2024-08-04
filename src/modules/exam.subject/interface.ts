import { Schema } from 'mongoose';
import { TClass } from '../../global/types';

export type TExamSubject = {
  _id: Schema.Types.ObjectId;
  examId: Schema.Types.ObjectId;
  name: string;
  fullMarks: number;
  class: TClass;
};
