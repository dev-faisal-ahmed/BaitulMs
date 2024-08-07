import { Schema, model } from 'mongoose';
import { TAttendance, TAttendanceModel } from '../interface';
import { AttendanceStatuses } from '../constants';
import { getAttendanceByStudentId } from './get.attendance.by.student.id';

const AttendanceSchema = new Schema<TAttendance, TAttendanceModel>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'student' },
    teacherId: { type: Schema.Types.ObjectId, ref: 'teacher' },
    date: { type: Date, default: new Date() },
    status: { type: String, enum: AttendanceStatuses, default: 'PRESENT' },
  },
  { timestamps: true }
);

AttendanceSchema.statics.getAttendanceByStudentId = getAttendanceByStudentId;

export const Attendance = model<TAttendance, TAttendanceModel>(
  'attendance',
  AttendanceSchema
);
