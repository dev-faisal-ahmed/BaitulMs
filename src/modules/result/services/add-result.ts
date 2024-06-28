import { AppError } from '../../../utils/app-error';
import { ResultModel } from '../model';
import { TAddResultPayload } from '../validation';

export const AddResult = async (payload: TAddResultPayload) => {
  const { studentId, examId, subjectId } = payload;
  const isResultExist = await ResultModel.findOne({
    studentId,
    subjectId,
    examId,
  });

  if (isResultExist)
    throw new AppError('This course has been already graded', 400);

  const newResult = await ResultModel.create(payload);
  return newResult;
};
