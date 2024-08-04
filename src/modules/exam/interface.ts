import { Schema } from 'mongoose';
import { TClass } from '../../global/types';

export type TExam = {
  _id: Schema.Types.ObjectId;
  name: string;
  year: string;
  status: TExamStatus;
  percentile: number;
  subjects: TExamSubject[];
  class: TClass;
};

export type TExamSubject = {
  name: string;
  fullMarks: number;
};

export type TExamStatus = 'UPCOMING' | 'ONGOING' | 'FINISHED';
