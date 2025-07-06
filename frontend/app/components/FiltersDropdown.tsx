import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const FiltersDropdown = (props: Props) => {
  const { children } = props;

  return (
    <div className="absolute top-full mt-2 bg-white rounded-lg p-3 shadow flex flex-col gap-4 z-100">
      {children}
    </div>
  );
};
