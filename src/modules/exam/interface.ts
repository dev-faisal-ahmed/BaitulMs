import { Schema } from 'mongoose';

export type TExam = {
  _id: Schema.Types.ObjectId;
  name: string;
  year: string;
  status: TExamStatus;
  percentile: number;
  subjects: TExamSubject[];
};

export type TExamSubject = {
  name: string;
  fullMarks: number;
};

export type TExamStatus = 'UPCOMING' | 'ONGOING' | 'FINISHED';
