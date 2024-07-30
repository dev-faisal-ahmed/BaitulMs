import { SendSuccessResponse } from '../../helpers';
import { TryCatch } from '../../utils/try-catch';
import { TransactionService } from './services';

const AddTransaction = TryCatch(async (req, res) => {
  const newTransaction = await TransactionService.AddTransaction(req.body);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Transaction added successfully',
    data: newTransaction,
  });
});

export const TransactionController = { AddTransaction };
