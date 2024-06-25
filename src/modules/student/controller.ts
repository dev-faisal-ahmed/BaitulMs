import { SendSuccessResponse } from '../../utils/helpers/response.helper';
import { TryCatch } from '../../utils/try-catch';
import { StudentService } from './services';

const CreateStudent = TryCatch(async (req, res) => {
  const newStudent = await StudentService.CreateStudent(req.body);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Student Created Successfully',
    data: newStudent,
  });
});

export const StudentController = { CreateStudent };
