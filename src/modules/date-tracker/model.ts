import { model, Schema } from 'mongoose';
import { TDateTracker } from './interface';
import { DateStatuses } from './constants';

const DateTrackerSchema = new Schema<TDateTracker>(
  {
    date: { type: Date, required: true },
    status: { type: String, enum: DateStatuses, default: 'ACTIVE_DAY' },
  },
  { timestamps: true }
);

export const DateTrackerModel = model('date-tracker', DateTrackerSchema);
