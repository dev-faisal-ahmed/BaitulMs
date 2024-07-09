import { AppError } from '../../../utils/app-error';
import { hashPassword, matchPassword } from '../../../utils/helpers';
import { UserModel } from '../../user/model';
import { TChangePasswordPayload } from '../validation';

export const ChangePassword = async (
  userId: string,
  payload: TChangePasswordPayload
) => {
  const userInfo = await UserModel.findOne({ _id: userId });
  if (!userInfo) throw new AppError('User not found', 400);

  const isPasswordMatched = await matchPassword(
    payload.oldPassword,
    userInfo.password
  );

  if (!isPasswordMatched) throw new AppError('Wrong Password', 400);
  const hashedPassword = await hashPassword(payload.newPassword);

  userInfo.password = hashedPassword;
  const isPassword = await userInfo.save();
  console.log(isPassword);

  return isPassword;
};
