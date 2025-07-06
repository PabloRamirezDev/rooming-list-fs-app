"use client";

import { ReactNode, useState } from "react";
import { SlidersIcon } from "../icons/SlidersIcon";
import { FiltersDropdown } from "./FiltersDropdown";

interface Props {
  children?: ReactNode;
}

export const Filters = (props: Props) => {
  const { children } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="data-[open=false]:hidden fixed inset-0 z-100"
        onClick={handleClose}
        data-open={open}
      />
      <div className="group relative" data-open={open}>
        <button
          onClick={handleOpen}
          className="w-27.5 h-full rounded-lg bg-white border border-ui-secondary focus:border-primary text-sm font-medium flex flex-row items-center justify-center gap-3 text-text-primary"
        >
          <span className="w-10.5">Filters</span>
          <span className="">
            <SlidersIcon />
          </span>
        </button>
        {open && (
          <FiltersDropdown>
            {children}
            <button className="bg-primary rounded text-white text-sm leading-4 font-semibold py-2">
              Save
            </button>
          </FiltersDropdown>
        )}
      </div>
    </>
  );
};
