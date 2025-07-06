import { getMonthShort } from "../lib/get-month-short";

interface Props {
  date: Date;
}

export const DateIndicator = (props: Props) => {
  const { date } = props;

  return (
    <div className="w-14 text-secondary rounded-lg overflow-clip">
      <div className="py-0.5 bg-secondary/25 uppercase text-xs text-center leading-3 tracking-[1px] font-semibold">
        {getMonthShort(date)}
      </div>
      <div className="py-1 bg-secondary/10 text-lg font-bold text-center">
        {date.getUTCDate()}
      </div>
    </div>
  );
};
