import {
  TGuardian,
  TParents,
  TPerson,
  TStudent,
  TStudentName,
} from './interface';
import { TClass } from '../../global/types';
import { StudentTypes, StudentsStatus } from './constants';
import { Schema, model } from 'mongoose';
import { BloodGroups, Sections } from '../../global/constants';
import { AddressSubSchema } from '../../global/schema';

const NameSubSchema = new Schema<TStudentName>(
  {
    bengaliName: { type: String, required: true },
    englishName: { type: String, required: true },
  },
  { _id: false }
);

const ClassSubSchema = new Schema<TClass>(
  {
    arabic: { type: String, required: true },
    general: { type: String, required: true },
  },
  { _id: false }
);

const PersonSubSchema = new Schema<TPerson>(
  {
    name: { type: String, required: true },
    nid: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const ParentsSubSchema = new Schema<TParents>(
  {
    father: PersonSubSchema,
    mother: PersonSubSchema,
  },
  { _id: false }
);

const GuardianSubSchema = new Schema<TGuardian>(
  {
    name: { type: String, required: true },
    nid: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    relation: { type: String, required: true },
  },
  { _id: false }
);

const StudentSchema = new Schema<TStudent>(
  {
    studentId: { type: String, required: true, unique: true },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
      unique: true,
    },
    birthCertification: { type: String, required: true, unique: true },
    name: { type: NameSubSchema, required: true },
    section: { type: String, enum: Sections, required: true },
    type: { type: String, enum: StudentTypes, default: 'REGULAR' },
    image: { type: String, required: true },
    class: { type: ClassSubSchema, required: true },
    dateOfBirth: { type: Date, required: true },
    bloodGroup: { type: String, enum: BloodGroups, required: true },
    parents: { type: ParentsSubSchema, required: true },
    guardian: { type: GuardianSubSchema, required: true },
    address: { type: AddressSubSchema, required: true },
    status: { type: String, enum: StudentsStatus, default: 'ACTIVE' },
  },
  { timestamps: true }
);

export const Student = model<TStudent>('student', StudentSchema);
