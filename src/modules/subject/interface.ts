import { Schema } from 'mongoose';

export type TSubject = {
  _id: Schema.Types.ObjectId;
  name: string;
};
