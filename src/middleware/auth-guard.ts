import { JWT_SECRET } from '../config';
import { AppError } from '../utils/app-error';
import { TryCatch } from '../utils/try-catch';
import JWT, { JwtPayload, Secret } from 'jsonwebtoken';

export const AuthGuard = TryCatch(async (req, _, next) => {
  const token = req.headers.authorization;
  if (!token) throw new AppError(403, 'No Token Found!');

  const decodedUser = JWT.verify(token, JWT_SECRET as Secret) as JwtPayload;
  const { _id } = decodedUser;
  // const user = await User.findOne({ _id });
  // if (!user) throw new AppError(404, 'User Not Found');
  // req.user = user;
  next();
});
