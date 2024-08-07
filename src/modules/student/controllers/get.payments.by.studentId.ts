import { TryCatch } from '../../../utils';
import { sendSuccessResponse } from '../../../helpers';
import { Transaction } from '../../transaction/model';

export const GetPaymentsByStudentId = TryCatch(async (req, res) => {
  const { studentId } = req.params;

  const payments = await Transaction.find({
    'payment.studentId': studentId,
  }).sort({ createdAt: -1 });

  sendSuccessResponse(res, {
    status: 200,
    message: 'Payments Retrieved Successfully',
    data: payments,
  });
});
