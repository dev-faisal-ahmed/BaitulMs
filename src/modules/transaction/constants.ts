import { TPaymentType, TSalaryType, TTransactionType } from './interface';

export const TransactionTypes: TTransactionType[] = [
  'PAYMENT',
  'SALARY',
  'EXPENSE',
];

export const PaymentTypes: TPaymentType[] = [
  'ADMISSION_FEE',
  'MONTHLY_FEE',
  'OTHERS',
];

export const SalaryTypes: TSalaryType[] = ['SALARY', 'OTHERS'];
