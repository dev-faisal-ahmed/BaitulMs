export const Picker = (fields: string[], data: Record<string, any>) => {
  return fields.reduce((acc: Record<string, any>, field) => {
    if (data[field]) acc[field] = data[field];
    return acc;
  }, {});
};

export const isEmptyObject = (obj: Record<string, any>) => {
  return Boolean(!Object.keys(obj).length);
};
