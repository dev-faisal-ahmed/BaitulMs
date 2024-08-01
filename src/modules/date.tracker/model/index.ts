import { model, Schema } from 'mongoose';
import { TDateTracker, TDateTrackerModel } from '../interface';
import { DateStatuses } from '../constants';
import { getDatesByRange } from './get.dates.by.range';

const DateTrackerSchema = new Schema<TDateTracker, TDateTrackerModel>(
  {
    date: { type: Date, required: true },
    status: { type: String, enum: DateStatuses, default: 'ACTIVE_DAY' },
  },
  { timestamps: true }
);

DateTrackerSchema.statics.getDatesByRange = getDatesByRange;

export const DateTracker = model<TDateTracker, TDateTrackerModel>(
  'date-tracker',
  DateTrackerSchema
);
