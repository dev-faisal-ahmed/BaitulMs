import { Schema } from 'mongoose';

export type TNoticeFor = 'TEACHER' | 'STUDENT' | 'BOTH';
export type TNotice = {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  noticeFor: TNoticeFor;
  publishedAt: Date;
};
