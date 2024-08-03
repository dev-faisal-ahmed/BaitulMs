import { z } from 'zod';
import { PaymentTypes, SalaryTypes, TransactionTypes } from './constants';
import { enumGenerator } from '../../helpers';
import { SDate } from '../../global/validation';

const SPayment = z.object({
  studentId: z.string({ required_error: 'StudentId is required' }),
  type: enumGenerator(
    PaymentTypes,
    `PaymentType is required and it has to be ${PaymentTypes}`
  ),
});

const SSalary = z.object({
  teacherId: z.string({ required_error: 'TeacherId is required' }),
  type: enumGenerator(
    SalaryTypes,
    `SalaryType is required and it has to be ${SalaryTypes}`
  ),
});

const SAddTransaction = z.object({
  type: enumGenerator(
    TransactionTypes,
    `TransactionType is required and it has to be ${TransactionTypes}}`
  ),
  payment: SPayment.optional(),
  salary: SSalary.optional(),
  expenseCategoryId: z.string().optional(),
  forDate: SDate,
  amount: z.number({ required_error: 'Amount is required' }),
});

export const TransactionValidation = { SAddTransaction };
export type TAddTransactionPayload = z.infer<typeof SAddTransaction>;
