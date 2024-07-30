import { SendSuccessResponse } from '../../helpers';
import { TryCatch } from '../../utils/try-catch';
import { ExpenseCategoryService } from './services';

const AddExpenseCategory = TryCatch(async (req, res) => {
  const newCategory = await ExpenseCategoryService.AddExpenseCategory(req.body);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Expense Category Added Successfully',
    data: newCategory,
  });
});

export const ExpenseCategoryController = { AddExpenseCategory };
