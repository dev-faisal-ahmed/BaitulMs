export const getMonth = (month: number) => {
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  return months[month];
};

export const getTotalMonthsCount = (startDate: Date, endDate: Date) => {
  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();

  const endMonth = endDate.getMonth();
  const endYear = endDate.getFullYear();

  let totalMonths = (endYear - startYear) * 12;
  totalMonths += endMonth - startMonth + 1;

  return totalMonths;
};

export const getDayRange = (date: Date) => {
  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const endOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );

  endOfDay.setMinutes(1439, 59, 999);

  return { startOfDay, endOfDay };
};

export const isBiggerDate = (date: Date, targetDate: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const targetDay = targetDate.getDate();
  const targetMonth = targetDate.getMonth();
  const targetYear = targetDate.getFullYear();

  if (year > targetYear) return true;
  if (year === targetYear && month > targetMonth) return true;
  if (year === targetYear && month === targetMonth && day > targetDay)
    return true;

  return false;
};

export const generateDates = (start: Date, end: Date) => {
  let date = new Date(start);
  const dates = [];

  while (!isBiggerDate(date, end)) {
    dates.push(date);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  }
  return dates;
};
