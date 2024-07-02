export const Picker = (fields: string[], data: Record<string, any>) => {
  return fields.reduce((acc: Record<string, any>, field) => {
    if (data[field]) acc[field] = data[field];
    return acc;
  }, {});
};

export const IsEmptyObject = (obj: Record<string, any>) => {
  return Boolean(!Object.keys(obj).length);
};

export const IsValidDate = (date: string) => {
  const dateObject = new Date(date);

  return (
    !isNaN(dateObject.getTime()) && dateObject.toString() !== 'Invalid Date'
  );
};

export const Formatter = (payload: string, size: number) => {
  let data: string = '';
  const length = payload.length;

  if (length < size) {
    for (let i = 1; i <= size - length; i++) data += '0';
  }

  data += payload;
  return data;
};
