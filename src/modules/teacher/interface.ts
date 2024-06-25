import { Schema } from 'mongoose';
import { TAddress, TSection, TStatus } from '../../global/types';

export type TTeacherAddress = {
  present: TAddress;
  permanent: TAddress;
};

export type TTeacher = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  teacherId: string;
  name: string;
  nid: string;
  status: TStatus;
  number: string;
  section: TSection;
  salary: number;
  dateOfBirth: Date;
  dateOfJoining: Date;
  nationality: string;
  image: string;
  address: TTeacherAddress;
};
