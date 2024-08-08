import {
  getMonth,
  getTotalMonthsCount,
  sendSuccessResponse,
} from '../../../helpers';
import { AppError, TryCatch } from '../../../utils';
import { Transaction } from '../../transaction/model';
import { Student } from '../model';

export const GetDuePaymentInfo = TryCatch(async (req, res) => {
  const { studentId } = req.params;

  const studentInfo = await Student.findOne({ _id: studentId });
  if (!studentInfo) throw new AppError('Student not found', 404);

  const payments = await Transaction.find({
    'payment.studentId': studentId,
    'payment.type': 'MONTHLY_FEE',
  });

  let startDate = new Date(studentInfo.admittedAt);
  const endDate = new Date();

  const totalMonth = getTotalMonthsCount(startDate, endDate);
  const paymentObject: Record<string, 'DUE' | 'PAID'> = {};

  // generating payment object assuming all are due
  for (let i = 0; i < totalMonth; i++) {
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    paymentObject[`${getMonth(month)}:${year}`] = 'DUE';
    startDate = new Date(year, month + 1, startDate.getDate());
  }

  // removing the months which is paid
  payments.forEach((payment) => {
    const { forDate } = payment;
    const year = forDate.getFullYear();
    const month = forDate.getMonth();
    const dateStr = `${getMonth(month)}:${year}`;

    if (paymentObject[dateStr]) delete paymentObject[dateStr];
  });

  sendSuccessResponse(res, {
    status: 200,
    message: "Due Payment's Retrieved Successfully",
    data: paymentObject,
  });
});
