import {
  isValidDate,
  isValidNumber,
  sendSuccessResponse,
} from '../../../helpers';
import { TryCatch } from '../../../utils';
import { Transaction } from '../model';

export const GetTransactions = TryCatch(async (req, res) => {
  const { query } = req;
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const month = query.month as string;
  const year = query.year as string;
  const startDate = query.startDate as string;
  const endDate = query.endDate as string;
  const min = query.min as string;
  const max = query.max as string;

  const dbQuery: Record<string, any> = {};
  // for transaction type
  if (query.type) dbQuery.type = query.type;
  // for expense category
  if (query.expenseCategoryId)
    dbQuery.expenseCategoryId = query.expenseCategoryId;

  if (month && isValidDate(month)) {
    // get transactions for a specific month
    const today = new Date(month);
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1); // stating date of a that month

    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // end date of that month

    dbQuery.forDate = { $gte: startDate, $lte: endDate };
  }

  //  get transaction for a specific year
  if (year && isValidDate(year)) {
    const today = new Date(year);
    const startDate = new Date(today.getFullYear(), 0, 1); // stating date of a that year

    const endDate = new Date(today.getFullYear() + 1, 0, 0); // end date of that year

    dbQuery.forDate = { $gte: startDate, $lte: endDate };
  }

  // for date range
  if (startDate || endDate) {
    const forDateQuery: Record<string, any> = {};
    if (isValidDate(startDate)) forDateQuery.$gte = new Date(startDate);
    if (isValidDate(endDate)) forDateQuery.$lte = new Date(endDate);

    dbQuery.forDate = forDateQuery;
  }

  // for amount range
  if (min || max) {
    const amountRangeQuery: Record<string, any> = {};
    if (isValidNumber(min)) amountRangeQuery.$gte = Number(min);
    if (isValidNumber(max)) amountRangeQuery.$lte = Number(max);
    dbQuery.amount = amountRangeQuery;
  }

  // handling sorting
  const sortOrder = query.sortOrder || 'dsc';
  let sortOn = query.sortOn as string;
  const sortableFields = ['amount', 'forDate'];
  if (!sortOn || !sortableFields.includes(sortOn.toString()))
    sortOn = 'forDate';

  const transactions = await Transaction.find(dbQuery)
    .populate({
      path: 'payment.studentId',
      select: ['name', 'studentId', 'section', 'class', 'image'],
    })
    .populate({
      path: 'salary.teacherId',
      select: ['name', 'teacherId', 'image'],
    })
    .populate({ path: 'expenseCategoryId', select: ['_id', 'name'] })
    .sort({ [sortOn]: sortOrder === 'asc' ? 1 : -1 });

  const total = await Transaction.countDocuments(dbQuery);
  const totalPages = Math.ceil(total / limit);

  sendSuccessResponse(res, {
    status: 200,
    message: 'Transactions Retrieved Successfully',
    meta: { page, limit, total, totalPages },
    data: transactions,
  });
});
