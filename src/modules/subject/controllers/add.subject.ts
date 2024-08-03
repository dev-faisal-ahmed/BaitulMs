import { sendSuccessResponse } from '../../../helpers';
import { TryCatch } from '../../../utils';
import { Subject } from '../model';
import { TAddSubjectPayload } from '../validation';

export const AddSubject = TryCatch(async (req, res) => {
  const payload: TAddSubjectPayload = req.body;
  const newSubject = await Subject.create(payload);

  sendSuccessResponse(res, {
    status: 200,
    message: 'Subject added successfully',
    data: newSubject,
  });
});
