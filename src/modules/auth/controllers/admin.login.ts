import { AppError, TryCatch } from '../../../utils';
import { Admin } from '../../admin/model';
import { TAdminLoginPayload } from '../validation';
import { generateAuthToken, sendSuccessResponse } from '../../../helpers';

export const AdminLogin = TryCatch(async (req, res) => {
  const payload: TAdminLoginPayload = req.body;

  const isAdminExist = await Admin.findOne({ email: payload.email });
  if (!isAdminExist) throw new AppError('Unauthorized access', 400);

  const token = generateAuthToken({
    _id: isAdminExist._id,
    name: isAdminExist.name,
    role: isAdminExist.role,
  });

  sendSuccessResponse(res, {
    status: 200,
    message: 'Login was successful',
    data: { token },
  });
});
