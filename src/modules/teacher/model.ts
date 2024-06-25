import { Schema, model } from 'mongoose';
import { TTeacher, TTeacherAddress } from './interface';
import { TeacherStatus } from './constants';
import { Sections } from '../../global/constants';
import { AddressSubSchema } from '../../global/schema';

const TeacherAddressSubSchema = new Schema<TTeacherAddress>(
  {
    present: { type: AddressSubSchema, required: true },
    permanent: { type: AddressSubSchema, required: true },
  },
  { _id: false }
);

const TeacherSchema = new Schema<TTeacher>(
  {
    teacherId: { type: String, required: true, unique: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    nid: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: TeacherStatus,
      required: true,
      default: 'ACTIVE',
    },
    number: { type: String, required: true, unique: true },
    section: { type: String, enum: Sections, required: true },
    salary: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    dateOfJoining: { type: Date, required: true },
    nationality: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: TeacherAddressSubSchema, required: true },
  },
  { timestamps: true }
);

export const TeacherModel = model('teacher', TeacherSchema);
