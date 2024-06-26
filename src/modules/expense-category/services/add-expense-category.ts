import { ExpenseCategoryModel } from '../model';
import { TAddExpenseCategoryPayload } from '../validation';

export const AddExpenseCategory = async (
  payload: TAddExpenseCategoryPayload
) => {
  const newCategory = await ExpenseCategoryModel.create(payload);
  return newCategory;
};
