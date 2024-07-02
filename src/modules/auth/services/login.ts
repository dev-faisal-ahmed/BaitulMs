import { AppError } from '../../../utils/app-error';
import { matchPassword } from '../../../utils/helpers';
import { generateAuthToken } from '../../../utils/helpers/token.helper';
import { UserModel } from '../../user/model';
import { TLoginPayload } from '../validation';

export const Login = async (payload: TLoginPayload) => {
  const isUserExist = await UserModel.findOne({ userId: payload.userId });
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

  return token;
};
