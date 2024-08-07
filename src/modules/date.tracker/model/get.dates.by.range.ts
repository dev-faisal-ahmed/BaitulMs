import { DateTracker } from '.';
import { TGetDatesByRangesArgs } from '../interface';

export const getDatesByRange = async (args: TGetDatesByRangesArgs) => {
  let query: Record<string, any> = {};
  if (args.type === 'DAYS') {
    const { days } = args;
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);
    query = { date: { $gte: startDate, $lte: today } };
  } else if (args.type === 'RANGE') {
    const { startDate, endDate } = args;
    const today = endDate || new Date();
    query = { date: { $gte: startDate, $lte: today } };
  }

  const daysInfo = await DateTracker.find(query).sort({ date: 1 });
  return daysInfo;
};
