import { sendSuccessResponse } from '../../../helpers';
import { AppError, TryCatch } from '../../../utils';
import { ExamSubject } from '../model';

export const DeleteExamSubject = TryCatch(async (req, res) => {
  const { examSubjectId } = req.params;
  const result = await ExamSubject.findOneAndDelete({ _id: examSubjectId });

  if (!result) throw new AppError('Subject Not Found!', 404);

  sendSuccessResponse(res, {
    status: 200,
    message: 'Subject Delete Successfully',
    data: null,
  });
});
