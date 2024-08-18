import { AddStudent } from './add.student';
import { GetStudentInfo } from './get.student.info';
import { GetPaymentsByStudentId } from './get.payments.by.studentId';
import { GetStudents } from './get.students';
import { GetDuePaymentsInfo } from './get.due.payments.info';

export const StudentController = {
  AddStudent,
  GetStudents,
  GetStudentInfo,
  GetPaymentsByStudentId,
  GetDuePaymentsInfo,
};
