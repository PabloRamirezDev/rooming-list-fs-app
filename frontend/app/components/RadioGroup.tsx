interface Props {
  label: string;
  id: string;
  options: {
    id: string;
    label: string;
    checked: boolean;
  }[];
  onChange: (id: string, value: boolean) => void;
}

export const RadioGroup = (props: Props) => {
  const { label, options, id, onChange } = props;

  return (
    <div className="w-40 flex flex-col gap-2">
      <p className="uppercase text-xs leading-4.5 font-normal text-text-secondary">
        {label}
      </p>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex flex-row gap-2 cursor-pointer items-center"
          >
            <div className="relative w-4.5 h-4.5 rounded-full border border-ui-secondary has-checked:bg-highlight-1 has-checked:border-none">
              <input
                id={`filter-checkbox-${option.id}`}
                type="radio"
                checked={option.checked}
                className="absolute hidden peer"
                name={id}
                onChange={(e) => onChange(option.id, e.currentTarget.checked)}
              />
              <div className="hidden peer-checked:flex w-full h-full items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
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
