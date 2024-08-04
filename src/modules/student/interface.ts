import {
  TAddress,
  TBloodGroup,
  TSection,
  TStatus,
  TClass,
} from '../../global/types';
import { Schema } from 'mongoose';

export type TStudent = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  studentId: string;
  birthCertification: string;
  name: TStudentName;
  section: TSection;
  type: TStudentType;
  image: string;
  class: TClass;
  dateOfBirth: Date;
  bloodGroup: TBloodGroup;
  parents: TParents;
  guardian: TGuardian;
  address: TAddress;
  status: TStatus;
  admittedAt: Date;
};

export type TStudentName = {
  bengaliName: string;
  englishName: string;
};

export type TStudentType = 'REGULAR' | 'IRREGULAR';

export type TParents = {
  father: TPerson;
  mother: TPerson;
};

export type TPerson = {
  name: string;
  phone: string;
  nid: string;
};

export type TGuardian = {
  name: string;
  relation: string;
  address: string;
  nid: string;
  number: string;
};
