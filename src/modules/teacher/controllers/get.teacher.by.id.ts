import { sendSuccessResponse } from '../../../helpers';
import { AppError, TryCatch } from '../../../utils';
import { Attendance } from '../../attendance/model';
import { DateTracker } from '../../date.tracker/model';
import { Teacher } from '../model';

export const GetTeacherById = TryCatch(async (req, res) => {
  const { teacherId } = req.params;

  const teacherInfo = await Teacher.findOne({ _id: teacherId });
  if (!teacherInfo) throw new AppError('Teacher not found!', 404);

  const totalPresent = await Attendance.countDocuments({
    teacherId,
    status: 'PRESENT',
  });

  const totalInLeave = await Attendance.countDocuments({
    teacherId,
    status: 'IN_LEAVE',
  });

  const today = new Date();

  const dates = await DateTracker.find({
    dateFor: 'TEACHER',
    date: { $gte: teacherInfo.dateOfJoining, $lte: today },
    $nor: [{ status: 'HOLIDAY' }],
  });

  sendSuccessResponse(res, {
    status: 200,
    message: 'Teacher Info Retrieved Implemented',
    data: {
      teacherInfo: teacherInfo.toObject(),
      attendanceInfo: {
        totalDays: dates.length,
        totalPresent,
        totalInLeave,
      },
    },
  });
});
