import { SendSuccessResponse } from '../../../helpers';
import { TryCatch } from '../../../utils';
import { Transaction } from '../model';
import { TAddTransactionPayload } from '../validation';

export const AddTransaction = TryCatch(async (req, res) => {
  const payload: TAddTransactionPayload = req.body;
  const newTransaction = await Transaction.create(payload);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Transaction Added Successfully',
    data: newTransaction,
  });
});
