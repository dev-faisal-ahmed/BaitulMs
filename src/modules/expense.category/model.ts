import { Schema, model } from 'mongoose';
import { TExpenseCategory } from './interface';

const ExpenseCategorySchema = new Schema<TExpenseCategory>(
  {
    name: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ExpenseCategory = model('expense-category', ExpenseCategorySchema);
