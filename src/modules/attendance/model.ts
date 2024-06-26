import { Schema, model } from 'mongoose';
import { TAttendance } from './interface';

const AttendanceSchema = new Schema<TAttendance>(
  { studentId: { type: String, required: true, ref: 'student' } },
  { timestamps: true }
);

export const AttendanceModel = model('attendance', AttendanceSchema);
