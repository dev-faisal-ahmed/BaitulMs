export async function getDatesByRange(this: any, days: number) {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - days);

  const daysInfo = await this.find({
    date: { $gte: startDate, $lte: today },
  }).sort({ date: 1 });
  return daysInfo;
}
