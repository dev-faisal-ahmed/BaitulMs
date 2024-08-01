import { SendSuccessResponse } from '../../../helpers';
import { AppError, TryCatch } from '../../../utils';
import { Result } from '../model';
import { TAddResultPayload } from '../validation';

export const AddResult = TryCatch(async (req, res) => {
  const payload: TAddResultPayload = req.body;
  const { studentId, examId, subjectId } = payload;
  const isResultExist = await Result.findOne({
    studentId,
    subjectId,
    examId,
  });

  if (isResultExist)
    throw new AppError('This course has been already graded', 400);

  const newResult = await Result.create(payload);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Course has been successfully graded',
    data: newResult,
  });
});
