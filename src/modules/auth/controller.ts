import { SendSuccessResponse } from '../../utils/helpers';
import { TryCatch } from '../../utils/try-catch';
import { AuthService } from './services';

const Login = TryCatch(async (req, res) => {
  const token = await AuthService.Login(req.body);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Login Was Successful',
    data: { token },
  });
});

const AdminLogin = TryCatch(async (req, res) => {
  const token = await AuthService.AdminLogin(req.body);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Login Was Successful',
    data: { token },
  });
});

export const AuthController = { Login, AdminLogin };
