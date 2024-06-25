import { Schema, model } from 'mongoose';
import { TUser } from './interface';
import { Roles } from './constants';

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Roles, required: true },
    shouldPasswordChange: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserModel = model('user', UserSchema);
