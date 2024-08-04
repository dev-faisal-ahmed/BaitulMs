import { Sections } from '../../../global/constants';
import { TSection } from '../../../global/types';
import { sendSuccessResponse } from '../../../helpers';
import { TryCatch } from '../../../utils';
import { Transaction } from '../../transaction/model';
import { Student } from '../model';

export const GetStudents = TryCatch(async (req, res) => {
  // query params
  const { query } = req;
  const general = query.general;
  const arabic = query.arabic;
  const section = query.section as string;
  const name = query.name;

  const dbQuery: Record<string, any> = {};

  if (general) dbQuery['class.general'] = general;
  if (arabic) dbQuery['class.arabic'] = arabic;
  if (section && Sections.includes(section.toUpperCase() as TSection))
    dbQuery.section = section.toUpperCase();
  if (name) dbQuery['name.englishName'] = { $regex: name, $options: 'i' };

  const students = await Student.find(
    { ...dbQuery, status: 'ACTIVE' },
    { name: 1, image: 1, studentId: 1, class: 1, guardian: 1, admittedAt: 1 }
  );

  const totalActiveStudents = await Student.countDocuments({
    status: 'ACTIVE',
  });

  const result = [];
  for (const student of students) {
    const { due } = await Transaction.getDuePayment(
      student._id,
      student.admittedAt
    );
    result.push({ studentInfo: student, due });
  }

  sendSuccessResponse(res, {
    status: 200,
    message: 'Student Retrieved Successfully',
    data: {
      totalActiveStudents,
      totalMatched: students.length,
      students: result,
    },
  });
});
