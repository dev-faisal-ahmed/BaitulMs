import { JWT_SECRET } from '../config';
import { TRole } from '../global/types';
import { Admin } from '../modules/admin/model';
import { User } from '../modules/user/model';
import { AppError } from '../utils/app-error';
import { TryCatch } from '../utils/try-catch';
import JWT, { JwtPayload, Secret } from 'jsonwebtoken';

const BEARER = 'Bearer';

export const AuthGuard = (...requiredRoles: TRole[]) => {
  return TryCatch(async (req, _, next) => {
    const token = req.headers.authorization;
    if (!token) throw new AppError('No Token Found!', 400);

    const [bearer, authToken] = token.split(' ');
    if (bearer.toLocaleLowerCase() !== BEARER.toLowerCase())
      throw new AppError('invalid token formate', 400);

    const decodedUser = JWT.verify(
      authToken,
      JWT_SECRET as Secret
    ) as JwtPayload;

    const { _id, role, name } = decodedUser;

    if (role === 'ADMIN') {
      const admin = Admin.findOne({ _id });
      if (!admin) throw new AppError('Admin not found', 400);

      if (!requiredRoles.includes('ADMIN'))
        throw new AppError('You are not authorized', 400);
    } else {
      const user = await User.findOne({ _id });
      if (!user) throw new AppError('User not found', 400);

      if (!requiredRoles.includes(user.role))
        throw new AppError('You are not authorized', 400);
    }

    req.user = { _id, role, name };
    next();
  });
};
