import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const BCRYPT_SALT = Number(process.env.BCRYPT_SALT);
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_NAME = process.env.ADMIN_NAME;
