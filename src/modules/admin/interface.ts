import { Schema } from 'mongoose';

export type TAdmin = {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  role: 'ADMIN';
};
