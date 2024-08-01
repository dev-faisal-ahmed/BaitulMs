import { Schema } from 'mongoose';

export type TExpenseCategory = {
  _id: Schema.Types.ObjectId;
  name: string;
  isDeleted: boolean;
};
