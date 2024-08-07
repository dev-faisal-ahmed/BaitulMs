import { Schema } from 'mongoose';
import { Transaction } from '.';
import { getTotalMonthsCount } from '../../../helpers';

export const getDueSalary = async (
  teacherId: Schema.Types.ObjectId,
  teacherJoiningDate: Date
) => {
  const salaries = await Transaction.find({
    type: 'SALARY',
    'salary.teacherId': teacherId,
    'salary.type': 'SALARY',
  });

  const salaryObject: Record<string, true> = {};
  salaries.forEach((salary) => {
    const { forDate } = salary;
    const year = forDate.getFullYear();
    const month = forDate.getMonth();

    salaryObject[`${month}:${year}`] = true;
  });

  const totalPaidMonth = Object.keys(salaryObject).length;
  const today = new Date();
  const totalToBePaidMonth = getTotalMonthsCount(teacherJoiningDate, today);

  return { due: totalToBePaidMonth - totalPaidMonth };
};
