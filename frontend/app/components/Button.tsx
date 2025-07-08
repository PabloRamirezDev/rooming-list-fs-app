import { MouseEventHandler, ReactNode } from "react";

interface Props {
  type: "primary" | "secondary";
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = (props: Props) => {
  const { children, type, className, onClick, disabled, loading } = props;

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${
          type === "primary" &&
          `
            text-sm font-semibold text-white bg-primary py-2.5 rounded-lg
          `
        }
        ${
          type === "secondary" &&
          `
            rounded-lg bg-white border border-ui-secondary text-sm font-medium text-text-primary px-5 py-3.25
          `
        }
        ${className}
        not-disabled:active:brightness-90 not-disabled:hover:brightness-95 duration-100
        cursor-pointer disabled:cursor-auto
        disabled:opacity-80

        `}
    >
      {children}
    </button>
  );
};
