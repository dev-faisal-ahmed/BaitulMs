import { SendSuccessResponse } from '../../helpers';
import { TryCatch } from '../../utils/try-catch';
import { TeacherService } from './services';

const AddTeacher = TryCatch(async (req, res) => {
  const newTeacher = await TeacherService.AddTeacher(req.body);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Teacher created successfully',
    data: newTeacher,
  });
});

export const TeacherController = { AddTeacher };
