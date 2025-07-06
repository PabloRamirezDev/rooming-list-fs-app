import { getMonthShort } from "./get-month-short";

export const formatTimeInterval = (start: Date, end: Date) => {
  const startMonth = getMonthShort(start);
  const startDay = start.getUTCDate();
  const startYear = start.getFullYear();

  const endMonth = getMonthShort(end);
  const endDay = end.getUTCDate();
  const endYear = end.getFullYear();

  if (startYear === endYear) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`;
  }

  return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
};
