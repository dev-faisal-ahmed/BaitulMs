import { Schema } from 'mongoose';

export type TExamStatus = 'UPCOMING' | 'ONGOING' | 'FINISHED';
export type TExam = {
  _id: Schema.Types.ObjectId;
  name: string;
  year: string;
  status: TExamStatus;
  percentile: number;
};
