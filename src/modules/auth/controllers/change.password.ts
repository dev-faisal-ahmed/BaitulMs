import {
  hashPassword,
  matchPassword,
  sendSuccessResponse,
} from '../../../helpers';
import { AppError, TryCatch } from '../../../utils';
import { User } from '../../user/model';
import { TChangePasswordPayload } from '../validation';

export const ChangePassword = TryCatch(async (req, res) => {
  const payload: TChangePasswordPayload = req.body;
  const user = req.user;

  if (payload.oldPassword === payload.newPassword)
    throw new AppError('Old password and new password are the same', 400);

  const userInfo = await User.findOne({ _id: user._id });
  if (!userInfo) throw new AppError('User not found', 404);

  const isPasswordMatched = await matchPassword(
    payload.oldPassword,
    userInfo.password
  );

  if (!isPasswordMatched) throw new AppError('Wrong Password', 400);
  const hashedPassword = await hashPassword(payload.newPassword);

  userInfo.password = hashedPassword;
  await userInfo.save();

  sendSuccessResponse(res, {
    status: 200,
    message: 'Password Changed Successfully',
    data: null,
  });
});
