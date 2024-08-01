import {
  generateAuthToken,
  matchPassword,
  SendSuccessResponse,
} from '../../../helpers';
import { AppError, TryCatch } from '../../../utils';
import { User } from '../../user/model';
import { TLoginPayload } from '../validation';

export const Login = TryCatch(async (req, res) => {
  const payload: TLoginPayload = req.body;

  const isUserExist = await User.findOne({ userId: payload.userId });
  if (!isUserExist) throw new AppError('Invalid Credential', 400);

  const isPasswordMatch = await matchPassword(
    payload.password,
    isUserExist.password
  );

  if (!isPasswordMatch) throw new AppError('Invalid Credential', 400);

  const token = generateAuthToken({
    _id: isUserExist._id,
    name: isUserExist.name,
    role: isUserExist.role,
  });

  SendSuccessResponse(res, {
    status: 200,
    message: 'Successfully Logged In',
    data: { token },
  });
});
