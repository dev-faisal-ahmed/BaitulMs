import { ExamSubject } from '../model';
import { AppError, TryCatch } from '../../../utils';
import { sendSuccessResponse } from '../../../helpers';
import { TUpdateExamSubjectPayload } from '../validation';

export const UpdateExamSubject = TryCatch(async (req, res) => {
  const { examSubjectId } = req.params;
  const payload: TUpdateExamSubjectPayload = req.body;

  const updatedExamSubject = await ExamSubject.findOneAndUpdate(
    { _id: examSubjectId },
    { $set: payload },
    { runValidators: true, new: true }
  );

  if (!updatedExamSubject) throw new AppError('Subject Not Found!', 404);

  sendSuccessResponse(res, {
    status: 200,
    message: 'Subject Updated Successfully',
    data: updatedExamSubject,
  });
});
