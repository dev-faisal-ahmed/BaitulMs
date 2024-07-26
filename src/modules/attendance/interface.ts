import { Model, Schema } from 'mongoose';
import { TDateTracker } from '../date-tracker/interface';
import { TStudent } from '../student/interface';

export type TAttendance = {
  _id: Schema.Types.ObjectId;
  studentId: Schema.Types.ObjectId;
  date: Date;
  status: TAttendanceStatus;
};

export type TAttendanceStatus = 'PRESENT' | 'IN_LEAVE';

export type TAttendanceModel = Model<TAttendance> & {
  getAttendanceByStudentId(
    daysInfo: TDateTracker[],
    studentId: Schema.Types.ObjectId,
    days: number
  ): Promise<TStudentAttendanceInfo>;
};

export type TStudentAttendanceInfo = {
  studentInfo: TStudent;
  attendances: TAttendancesInfo;
};

export type TAttendancesInfo = {
  date: Date;
  status: 'PRESENT' | 'ABSENT' | 'IN_LEAVE' | 'HOLIDAY';
};
