import { TLoggedUser } from './global/types';

declare global {
  namespace Express {
    interface Request {
      user: TLoggedUser;
    }
  }
}
