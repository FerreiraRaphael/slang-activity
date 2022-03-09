export function getDateDiffSeconds(startDate: Date, endDate: Date) {
  const differenceInMS = startDate.getTime() - endDate.getTime();
  const differenceInSeconds = differenceInMS / 1000;

  return Math.abs(differenceInSeconds) // returns positive number;
}
