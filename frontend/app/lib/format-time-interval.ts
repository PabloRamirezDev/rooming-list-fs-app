import { getMonthShort } from "./get-month-short";

export const formatTimeInterval = (
  start: Date | string | undefined,
  end: Date | string | undefined
) => {
  const startDate = getSecureDate(start);
  const endDate = getSecureDate(end);

  if (!startDate && !endDate) return "";

  const startMonth = getMonthShort(startDate);
  const startDay = startDate?.getUTCDate();
  const startYear = startDate?.getFullYear();

  const endMonth = getMonthShort(endDate);
  const endDay = endDate?.getUTCDate();
  const endYear = endDate?.getFullYear();

  if (!startDate) {
    return `to ${endMonth} ${endDay}, ${endYear}`;
  }

  if (!endDate) {
    return `from ${startMonth} ${startDay}, ${startYear}`;
  }

  if (startYear === endYear) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`;
  }

  return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
};

const getSecureDate = (date: Date | string | undefined) => {
  if (!date) return null;

  if (typeof date === "string") return new Date(date);

  return date;
};
