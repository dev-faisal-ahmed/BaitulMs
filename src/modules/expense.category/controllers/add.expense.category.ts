import { SendSuccessResponse } from '../../../helpers';
import { TryCatch } from '../../../utils';
import { ExpenseCategory } from '../model';
import { TAddExpenseCategoryPayload } from '../validation';

export const AddExpenseCategory = TryCatch(async (req, res) => {
  const payload: TAddExpenseCategoryPayload = req.body;

  const newCategory = await ExpenseCategory.create(payload);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Expense Category Added Successfully',
    data: newCategory,
  });
});
