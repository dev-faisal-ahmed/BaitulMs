import { Schema } from 'mongoose';

export type TLoggedUser = {
  _id: Schema.Types.ObjectId;
  role: TRole;
  name: string;
};

export type TStatus = 'ACTIVE' | 'INACTIVE';

export type TSection = 'BOY' | 'GIRL';

export type TAddress = {
  villageOrStreetAddress: string;
  postOffice: string;
  thana: string;
  district: string;
};

export type TClass = {
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

export type TAuth = {
  _id: Schema.Types.ObjectId;
  name: string;
  role: TRole;
};

export type TRole = 'STUDENT' | 'TEACHER' | 'ADMIN';
