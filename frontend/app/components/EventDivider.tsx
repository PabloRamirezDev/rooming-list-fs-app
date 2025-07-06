interface Props {
  eventName: string;
}

export const EventDivider = (props: Props) => {
  const { eventName } = props;
  return (
    <div className="flex flex-row items-center gap-5">
      <div className="h-[1px] bg-linear-to-l group-even:from-highlight-1 group-even:to-highlight-1/0 group-odd:from-highlight-2 group-odd:to-highlight-2/0 grow" />
      <div className="w-fit py-1.25 px-1.75 group-even:bg-light-1 group-odd:bg-light-2 rounded border group-even:border-highlight-1 group-odd:border-highlight-2 text-sm font-bold group-even:text-highlight-1 group-odd:text-highlight-2">
        {eventName}
      </div>
      <div className="h-[1px] bg-linear-to-r group-even:from-highlight-1 group-even:to-highlight-1/0 group-odd:from-highlight-2 group-odd:to-highlight-2/0 grow" />
    </div>
  );
};
