import { SendSuccessResponse } from '../../utils/helpers';
import { TryCatch } from '../../utils/try-catch';
import { ExamService } from './services';

const AddExam = TryCatch(async (req, res) => {
  const newExam = await ExamService.AddExam(req.body);
  SendSuccessResponse(res, {
    status: 200,
    message: 'Exam Added Successfully',
    data: newExam,
  });
});

export const ExamController = { AddExam };
