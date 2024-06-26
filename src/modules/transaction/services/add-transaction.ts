import { TransactionModel } from '../model';
import { TAddTransactionPayload } from '../validation';

export const AddTransaction = async (payload: TAddTransactionPayload) => {
  const newTransaction = await TransactionModel.create(payload);
  return newTransaction;
};
