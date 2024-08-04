import { sendSuccessResponse } from '../../../helpers';
import { TryCatch } from '../../../utils';
import { Exam } from '../model';
import { TUpdateExamPayload } from '../validation';

export const UpdateExam = TryCatch(async (req, res) => {
  const payload: TUpdateExamPayload = req.body;
  const { examId } = req.params;

  const updatedExam = await Exam.findOneAndUpdate(
    { _id: examId },
    { $set: payload },
    { runValidators: true, new: true }
  );

  sendSuccessResponse(res, {
    status: 200,
    message: 'Exam Updated Successfully',
    data: updatedExam,
  });
});
