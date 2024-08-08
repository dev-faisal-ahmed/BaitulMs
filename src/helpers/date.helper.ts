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
