import { Schema } from 'mongoose';
import { Transaction } from '.';
import { getTotalMonthsCount } from '../../../helpers';

export const getDuePayment = async (
  studentId: Schema.Types.ObjectId,
  studentAdmissionDate: Date
) => {
  const payments = await Transaction.find({
    type: 'PAYMENT',
    'payment.studentId': studentId,
    'payment.type': 'MONTHLY_FEE',
  });

  const paymentObject: Record<string, true> = {};

  payments.forEach((payment) => {
    const { forDate } = payment;
    const year = forDate.getFullYear();
    const month = forDate.getMonth();

    paymentObject[`${month}:${year}`] = true;
  });

  const totalPaidMonths = Object.keys(paymentObject).length;
  const today = new Date();
  const totalMonths = getTotalMonthsCount(studentAdmissionDate, today);

  return { due: totalMonths - totalPaidMonths };
};
