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
  class: TStudentClass;
  dateOfBirth: Date;
  bloodGroup: TBloodGroup;
  parents: TParents;
  guardian: TGuardian;
  address: TAddress;
  status: TStatus;
};

export type TStudentName = {
  bengaliName: string;
  englishName: string;
};

export type TSection = 'BOY' | 'GIRL';

export type TStudentClass = {
  arabic: string;
  general: string;
};

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TStudentType = 'REGULAR' | 'IRREGULAR';

export type TStatus = 'ACTIVE' | 'INACTIVE';

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

export type TAddress = {
  villageOrStreetAddress: string;
  postOffice: string;
  thana: string;
  district: string;
};
