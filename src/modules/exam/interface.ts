import { Schema } from 'mongoose';

export type TExamStatus = 'UPCOMING' | 'ONGOING' | 'FINISHED';

export type TExam = {
  _id: Schema.Types.ObjectId;
  name: string;
  fullMarks: number;
  year: string;
  status: TExamStatus;
};
