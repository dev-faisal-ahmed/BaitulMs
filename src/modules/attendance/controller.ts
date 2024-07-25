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

const GetAttendanceByClass = TryCatch(async (req, res) => {
  const cls = req.params.class;
  const days = Number(req.params.days) || 30;
  const attendances = await AttendanceService.GetAttendancesByClass(cls, days);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Attendances retrieved successfully',
    data: attendances,
  });
});

export const AttendanceController = { AddAttendances, GetAttendanceByClass };
