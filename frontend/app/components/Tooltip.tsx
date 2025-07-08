import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export const Tooltip = (props: Props) => {
  const { children, content, className } = props;

  return (
    <div className={`group/tooltip relative ${className}`}>
      {children}
      <div className="hidden group-hover/tooltip:flex w-max absolute right-full top-0 -translate-2 bg-white rounded-lg p-2 shadow z-100 text-xs">
        {content}
      </div>
    </div>
  );
};
