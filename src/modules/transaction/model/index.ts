import {
  TPayment,
  TSalary,
  TTransaction,
  TTransactionModel,
} from '../interface';
import { Schema, model } from 'mongoose';
import { getDuePayment } from './get.due.payment';
import { getDueSalary } from './get.due.salary';
import { PaymentTypes, SalaryTypes, TransactionTypes } from '../constants';

const PaymentSubSchema = new Schema<TPayment>(
  {
    studentId: { type: Schema.Types.ObjectId, required: true, ref: 'student' },
    type: { type: String, enum: PaymentTypes, required: true },
  },
  { _id: false }
);

const SalarySubSchema = new Schema<TSalary>(
  {
    teacherId: { type: Schema.Types.ObjectId, required: true, ref: 'teacher' },
    type: { type: String, enum: SalaryTypes, required: true },
  },
  { _id: false }
);

const TransactionSchema = new Schema<TTransaction, TTransactionModel>(
  {
    type: { type: String, enum: TransactionTypes, required: true },
    payment: { type: PaymentSubSchema },
    salary: { type: SalarySubSchema },
    expenseCategoryId: { type: Schema.Types.ObjectId, ref: 'expense-category' },
    amount: { type: Number, required: true },
    forDate: { type: Date, required: true },
  },
  { timestamps: true }
);

TransactionSchema.statics.getDuePayment = getDuePayment;
TransactionSchema.statics.getDueSalary = getDueSalary;

export const Transaction = model<TTransaction, TTransactionModel>(
  'transaction',
  TransactionSchema
);
