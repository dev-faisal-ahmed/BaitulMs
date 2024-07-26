import { AppError } from '../../../utils/app-error';
import { hashPassword, matchPassword } from '../../../utils/helpers';
import { UserModel } from '../../user/model';
import { TChangePasswordPayload } from '../validation';

export const ChangePassword = async (
  userId: string,
  payload: TChangePasswordPayload
) => {
  if (payload.oldPassword === payload.newPassword)
    throw new AppError('Old password and new password are the same', 400);

  const userInfo = await UserModel.findOne({ _id: userId });
  if (!userInfo) throw new AppError('User not found', 404);

  const isPasswordMatched = await matchPassword(
    payload.oldPassword,
    userInfo.password
  );

  if (!isPasswordMatched) throw new AppError('Wrong Password', 400);
  const hashedPassword = await hashPassword(payload.newPassword);

  userInfo.password = hashedPassword;
  await userInfo.save();

  return 'Password Changed Successfully';
};
