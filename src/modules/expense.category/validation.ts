import { z } from 'zod';

const SAddExpenseCategory = z.object({
  name: z.string({ required_error: 'CategoryName is required' }),
});

export const ExpenseCategoryValidation = { SAddExpenseCategory };

export type TAddExpenseCategoryPayload = z.infer<typeof SAddExpenseCategory>;
