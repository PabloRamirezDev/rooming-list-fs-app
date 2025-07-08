"use client";

import { ReactNode, useState } from "react";
import { Button } from "./Button";
import { QuerySelectorDropdown } from "./QuerySelectorDropdown";

interface Props {
  label: ReactNode;
  children?: ReactNode;
  onSave?: () => void;
}

export const QuerySelector = (props: Props) => {
  const { label, children, onSave } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onSave?.();
    handleClose();
  };

  return (
    <>
      <div
        className="data-[open=false]:hidden fixed inset-0 z-100"
        onClick={handleClose}
        data-open={open}
      />
      <div className="group relative w-full" data-open={open}>
        <Button
          type="secondary"
          onClick={handleOpen}
          className="w-full focus:border-primary h-full flex flex-row items-center justify-center gap-3"
        >
          {label}
        </Button>
        {open && (
          <QuerySelectorDropdown>
            {children}
            <button
              onClick={handleSave}
              className="bg-primary rounded text-white text-sm leading-4 font-semibold py-2 cursor-pointer"
            >
              Save
            </button>
          </QuerySelectorDropdown>
        )}
      </div>
    </>
  );
};
