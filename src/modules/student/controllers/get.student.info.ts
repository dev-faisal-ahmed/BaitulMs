import { sendSuccessResponse } from '../../../helpers';
import { AppError, TryCatch } from '../../../utils';
import { Student } from '../model';

export const GetStudentInfo = TryCatch(async (req, res) => {
  const { studentId } = req.params;
  const studentInfo = await Student.findOne({ _id: studentId });

  if (!studentInfo) throw new AppError('No Student Found', 404);

  sendSuccessResponse(res, {
    status: 200,
    message: 'Student Retrieved Success',
    data: studentInfo,
  });
});
