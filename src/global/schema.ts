import { Schema } from 'mongoose';
import { TAddress, TClass } from './types';

export const AddressSubSchema = new Schema<TAddress>(
  {
    villageOrStreetAddress: { type: String, required: true },
    postOffice: { type: String, required: true },
    thana: { type: String, required: true },
    district: { type: String, required: true },
  },
  { _id: false }
);

export const ClassSubSchema = new Schema<TClass>(
  {
    arabic: { type: String, required: true },
    general: { type: String, required: true },
  },
  { _id: false }
);
