import { model, Schema } from 'mongoose';
import { TNotice } from './interface';
import { NoticeFor } from './constants';

const NoticeSchema = new Schema<TNotice>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  noticeFor: { type: String, enum: NoticeFor, default: 'BOTH' },
  publishedAt: { type: Date, default: new Date() },
});

export const Notice = model<TNotice>('notice', NoticeSchema);
