import { SendSuccessResponse } from '../../utils/helpers';
import { TryCatch } from '../../utils/try-catch';
import { AttendanceService } from './services';

const AddAttendances = TryCatch(async (req, res) => {
  const attendances = await AttendanceService.AddAttendances(req.body);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Attendances added successfully',
    data: attendances,
  });
});

const GetAttendances = TryCatch(async (req, res) => {
  const attendances = await AttendanceService.GetAttendances(req.query);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Attendances retrieved successfully',
    data: attendances,
  });
});

export const AttendanceController = { AddAttendances, GetAttendances };
