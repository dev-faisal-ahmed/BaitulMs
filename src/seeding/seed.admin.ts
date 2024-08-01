import mongoose from 'mongoose';
import { ADMIN_EMAIL, ADMIN_NAME, MONGO_URI } from '../config';
import { Admin } from '../modules/admin/model';

const SeedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    const isAdminExist = await Admin.findOne({ email: ADMIN_EMAIL });
    if (isAdminExist) throw new Error('This email already exist');

    const newAdmin = await Admin.create({
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
    });

    if (!newAdmin) throw new Error('Failed to create admin');

    console.log('******************************');
    console.log('Admin Name : ', ADMIN_NAME);
    console.log('Admin Email : ', ADMIN_EMAIL);
    console.log('******************************');
  } catch (error: any) {
    console.log('<><><><><><><><><><><><><><><><><><><><>');
    console.log(error.message || 'Something Went Wrong');
    console.log('<><><><><><><><><><><><><><><><><><><><>');
  } finally {
    await mongoose.disconnect();
  }
};

SeedAdmin();
