import { z } from 'zod';

const AddExpenseCategory = z.object({
  name: z.string({ required_error: 'CategoryName is required' }),
});

export const ExpenseCategoryValidation = { AddExpenseCategory };

export type TAddExpenseCategoryPayload = z.infer<typeof AddExpenseCategory>;
