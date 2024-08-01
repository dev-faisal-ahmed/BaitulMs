import { SendSuccessResponse } from '../../../helpers';
import { TryCatch } from '../../../utils';
import { Exam } from '../model';
import { TAddExamPayload } from '../validation';

export const AddExam = TryCatch(async (req, res) => {
  const payload: TAddExamPayload = req.body;
  const newExam = await Exam.create(payload);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Exam Added Successfully',
    data: newExam,
  });
});
