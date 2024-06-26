import { Schema } from 'mongoose';

export type TAttendance = {
  _id: Schema.Types.ObjectId;
  studentId: Schema.Types.ObjectId;
  date: Date;
};
