import { Model, Schema } from 'mongoose';
import { TStudent } from '../student/interface';

export type TTransaction = {
  _id: Schema.Types.ObjectId;
  type: TTransactionType;
  payment?: TPayment;
  salary?: TSalary;
  expenseCategoryId?: Schema.Types.ObjectId;
  forDate: Date;
  amount: number;
};

export type TPayment = {
  studentId: Schema.Types.ObjectId;
  type: TPaymentType;
};

export type TSalary = {
  teacherId: Schema.Types.ObjectId;
  type: TSalaryType;
};

export type TTransactionType = 'PAYMENT' | 'SALARY' | 'EXPENSE';
export type TPaymentType = 'MONTHLY_FEE' | 'ADMISSION_FEE' | 'OTHERS';
export type TSalaryType = 'SALARY' | 'OTHERS';

// model related type
export type TTransactionModel = Model<TTransaction> & {
  getDuePayment(
    studentId: Schema.Types.ObjectId,
    studentAdmissionDate: Date
  ): Promise<{ due: number }>;
  getDueSalary(
    teacherId: Schema.Types.ObjectId,
    teacherJoiningDate: Date
  ): Promise<{ due: number }>;
};
