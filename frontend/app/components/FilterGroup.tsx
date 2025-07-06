import { CheckmarkIcon } from "../icons/CheckmarkIcon";

interface Props {
  filterName: string;
  options: {
    id: string;
    label: string;
    checked: boolean;
  }[];
}

export const FilterGroup = (props: Props) => {
  const { filterName, options } = props;

  return (
    <div className="w-40 flex flex-col gap-2">
      <p className="uppercase text-xs leading-4.5 font-normal text-text-secondary">
        {filterName}
      </p>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex flex-row gap-2 cursor-pointer items-center"
          >
            <div className="relative w-4.5 h-4.5 rounded border border-ui-secondary has-checked:bg-highlight-1 has-checked:border-none">
              <input
                id={`filter-checkbox-${option.id}`}
                type="checkbox"
                // checked={option.checked}
                className="absolute hidden peer"
              />
              <div className="hidden peer-checked:flex w-full h-full items-center justify-center">
                <CheckmarkIcon />
              </div>
            </div>
            <div className="text-sm leading-4 font-semibold">
              {option.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
