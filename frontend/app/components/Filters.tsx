"use client";

import { SlidersIcon } from "../icons/SlidersIcon";
import { CheckboxGroup } from "./CheckboxGroup";
import { QuerySelector } from "./QuerySelector";
import { useEvents } from "../context/EventsContext";

export const Filters = () => {
  const { filters, updateFilter, revalidate } = useEvents();

  const handleSaveFilters = () => {
    revalidate();
  };

  const generateHandleChange =
    (filterId: string) => (optionId: string, value: boolean) => {
      updateFilter(filterId, optionId, value);
    };

  return (
    <QuerySelector
      label={
        <>
          <span className="w-10.5">Filters</span>
          <span className="">
            <SlidersIcon />
          </span>
        </>
      }
      onSave={handleSaveFilters}
    >
      {filters.map((filter) => (
        <CheckboxGroup
          key={filter.id}
          label={filter.label}
          options={filter.options}
          onChange={generateHandleChange(filter.id)}
        />
      ))}
    </QuerySelector>
  );
};
