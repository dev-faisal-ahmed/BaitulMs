export type TStatus = 'ACTIVE' | 'INACTIVE';

export type TSection = 'BOY' | 'GIRL';

export type TAddress = {
  villageOrStreetAddress: string;
  postOffice: string;
  thana: string;
  district: string;
};

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
