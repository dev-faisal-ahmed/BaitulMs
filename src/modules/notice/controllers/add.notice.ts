import { sendSuccessResponse } from '../../../helpers';
import { TryCatch } from '../../../utils';
import { Notice } from '../model';
import { TAddNoticePayload } from '../validation';

export const AddNotice = TryCatch(async (req, res) => {
  const payload: TAddNoticePayload = req.body;
  const notice = await Notice.create(payload);

  sendSuccessResponse(res, {
    status: 200,
    message: 'Notice Added Successfully',
    data: notice,
  });
});
