import { Schema } from 'mongoose';

export type TUser = {
  _id: Schema.Types.ObjectId;
  name: string;
  role: TRole;
  userId: string;
  password: string;
  shouldPasswordChange: boolean;
};

export type TRole = 'STUDENT' | 'TEACHER';
