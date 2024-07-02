import { AppError } from '../../../utils/app-error';
import { generateAuthToken } from '../../../utils/helpers/token.helper';
import { AdminModel } from '../../admin/model';
import { TAdminLoginPayload } from '../validation';

export const AdminLogin = async (payload: TAdminLoginPayload) => {
  const isAdminExist = await AdminModel.findOne({ email: payload.email });
  if (!isAdminExist) throw new AppError('Unauthorized access', 400);

  const token = generateAuthToken({
    _id: isAdminExist._id,
    name: isAdminExist.name,
    role: isAdminExist.role,
  });

  return token;
};
