import { Schema, model } from 'mongoose';
import { TAdmin } from './interface';

const AdminSchema = new Schema<TAdmin>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, default: 'ADMIN' },
  },
  { timestamps: true }
);

export const Admin = model<TAdmin>('admin', AdminSchema);
