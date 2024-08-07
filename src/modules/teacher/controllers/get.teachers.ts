import { Sections } from '../../../global/constants';
import { TSection } from '../../../global/types';
import { sendSuccessResponse } from '../../../helpers';
import { TryCatch } from '../../../utils';
import { Transaction } from '../../transaction/model';
import { Teacher } from '../model';

export const GetTeachers = TryCatch(async (req, res) => {
  const { query } = req;
  const activeStatusQuery = { status: 'ACTIVE' };
  const dbQuery: Record<string, any> = { ...activeStatusQuery };
  const teacherId = query.teacherId;
  const phone = query.phone;
  const name = query.name;
  const section = query.section;

  // find uniquely
  if (teacherId) dbQuery.teacherId = teacherId;
  if (phone) dbQuery.phone = phone;

  // partial match
  if (name) dbQuery.name = { $regex: name, $options: 'i' };

  // exact match
  if (section && Sections.includes(section as TSection))
    dbQuery.section = section;

  const teachers = await Teacher.find(dbQuery);
  const totalMatch = await Teacher.countDocuments(dbQuery);
  const totalActiveTeachers = await Teacher.countDocuments(activeStatusQuery);

  const result = [];
  for (const teacher of teachers) {
    const { due } = await Transaction.getDueSalary(
      teacher._id,
      teacher.dateOfJoining
    );
    result.push({ teacherInfo: teacher, due });
  }

  sendSuccessResponse(res, {
    status: 200,
    message: 'Teachers Retrieved Successfully',
    data: { totalActiveTeachers, totalMatch, teachers: result },
  });
});
