import {
  TAddress,
  TGuardian,
  TParents,
  TPerson,
  TStudent,
  TStudentClass,
  TStudentName,
} from './student.interface';
import { Schema } from 'mongoose';
import {
  BloodGroups,
  Sections,
  StudentTypes,
  StudentsStatus,
} from './student.constants';

const NameSubSchema = new Schema<TStudentName>(
  {
    bengaliName: { type: String, required: true },
    englishName: { type: String, required: true },
  },
  { _id: false }
);

const ClassSubSchema = new Schema<TStudentClass>(
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

const AddressSubSchema = new Schema<TAddress>(
  {
    villageOrStreetAddress: { type: String, required: true },
    postOffice: { type: String, required: true },
    thana: { type: String, required: true },
    district: { type: String, required: true },
  },
  { _id: false }
);

export const StudentSchema = new Schema<TStudent>({
  studentId: { type: String, required: true, unique: true },
  birthCertification: { type: String, required: true, unique: true },
  name: NameSubSchema,
  section: { type: String, enum: Sections, required: true },
  type: { type: String, enum: StudentTypes, default: 'REGULAR' },
  image: { type: String, required: true, unique: true },
  class: ClassSubSchema,
  dateOfBirth: { type: Date, required: true },
  bloodGroup: { type: String, enum: BloodGroups, required: true },
  parents: ParentsSubSchema,
  guardian: GuardianSubSchema,
  address: AddressSubSchema,
  status: { type: String, enum: StudentsStatus, required: true },
});
