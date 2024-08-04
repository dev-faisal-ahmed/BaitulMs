export const picker = (fields: string[], data: Record<string, any>) => {
  return fields.reduce((acc: Record<string, any>, field) => {
    if (data[field]) acc[field] = data[field];
    return acc;
  }, {});
};

export const isEmptyObject = (obj: Record<string, any>) => {
  return Boolean(!Object.keys(obj).length);
};

export const isValidDate = (date: string) => {
  const dateObject = new Date(date);
  return !isNaN(dateObject.getTime());
};

export const isValidNumber = (num: string) => {
  return !isNaN(Number(num));
};

export const formatter = (payload: string, size: number) => {
  let data: string = '';
  const length = payload.length;

  if (length < size) {
    for (let i = 1; i <= size - length; i++) data += '0';
  }

  data += payload;
  return data;
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
