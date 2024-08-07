import { Model, Schema } from 'mongoose';

export type TDateStatus = 'HOLIDAY' | 'ACTIVE_DAY';
export type TDateFor = 'STUDENT' | 'TEACHER';

export type TDateTracker = {
  _id: Schema.Types.ObjectId;
  date: Date;
  status: TDateStatus;
  dateFor: TDateFor;
};

export type TDateTrackerModel = Model<TDateTracker> & {
  getDatesByRange(days: number): Promise<TDateTracker[]>;
};
