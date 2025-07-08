export const EventSectionLoading = () => {
  return (
    <div className="shrink-0 group flex flex-col gap-4 overflow-x-hidden pb-9">
      <div className="flex flex-row items-center gap-5">
        <div className="h-[1px] bg-linear-to-l group-even:from-light-1 group-even:to-light-1/0 group-odd:from-light-2 group-odd:to-light-2/0 grow" />
        <div className="w-32 h-8 group-even:bg-light-1 group-odd:bg-light-2 rounded" />
        <div className="h-[1px] bg-linear-to-r group-even:from-light-1 group-even:to-light-1/0 group-odd:from-light-2 group-odd:to-light-2/0 grow" />
      </div>
      <div className="relative flex">
        <div className="w-fit flex flex-row gap-4">
          {Array(5)
            .fill(1)
            .map((_, i) => (
              <div
                key={`loading-card-${i}`}
                className="w-100 h-46 bg-ui-secondary animate-pulse rounded-lg"
              />
            ))}
        </div>
        <div className="absolute w-full h-full right-0 bg-linear-to-l from-canvas/80 to-canvas/0" />
      </div>
    </div>
  );
};
