import { Schema } from 'mongoose';
import { TAddress } from './types';

export const AddressSubSchema = new Schema<TAddress>(
  {
    villageOrStreetAddress: { type: String, required: true },
    postOffice: { type: String, required: true },
    thana: { type: String, required: true },
    district: { type: String, required: true },
  },
  { _id: false }
);
