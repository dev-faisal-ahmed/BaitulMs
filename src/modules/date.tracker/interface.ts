import { Model, Schema } from 'mongoose';

export type TDateStatus = 'HOLIDAY' | 'ACTIVE_DAY';
export type TDateFor = 'STUDENT' | 'TEACHER';

export type TDateTracker = {
  _id: Schema.Types.ObjectId;
  date: Date;
  status: TDateStatus;
  dateFor: TDateFor;
};

// model
export type TGetDatesByRangesArgs =
  | { type: 'DAYS'; days: number }
  | { type: 'RANGE'; startDate: Date; endDate?: Date };

export type TDateTrackerModel = Model<TDateTracker> & {
  getDatesByRange({ type }: TGetDatesByRangesArgs): Promise<TDateTracker[]>;
};
