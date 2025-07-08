"use client";

import { useEvents } from "../context/EventsContext";
import { QuerySelector } from "./QuerySelector";
import { RadioGroup } from "./RadioGroup";

const sortGroups = [
  {
    id: "cutoff-date",
    label: "Cut-Off Date",
    options: [
      { id: "asc" as const, label: "Ascending" },
      { id: "desc" as const, label: "Descending" },
    ],
  },
];

export const Sort = () => {
  const { sort, updateSort, revalidate } = useEvents();

  const handleSaveSort = () => {
    revalidate();
  };

  const generateHandleChange =
    (sortId: string) => (optionId: string, value: boolean) => {
      if (!value) {
        updateSort();
        return;
      }

      updateSort(sortId, optionId as "asc" | "desc");
    };

  return (
    <QuerySelector label="Sort" onSave={handleSaveSort}>
      {sortGroups.map((group) => (
        <RadioGroup
          key={group.id}
          id={group.id}
          label={group.label}
          options={group.options.map((option) => ({
            ...option,
            checked: group.id === sort?.key && option.id === sort?.direction,
          }))}
          onChange={generateHandleChange(group.id)}
        />
      ))}
    </QuerySelector>
  );
};
