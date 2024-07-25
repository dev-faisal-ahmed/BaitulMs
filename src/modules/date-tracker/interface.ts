import { Schema } from 'mongoose';

export type TDateStatus = 'HOLIDAY' | 'ACTIVE_DAY';

export type TDateTracker = {
  _id: Schema.Types.ObjectId;
  date: Date;
  status: TDateStatus;
};
