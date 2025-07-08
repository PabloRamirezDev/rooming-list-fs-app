import { ChangeEventHandler } from "react";
import { useEvents } from "../context/EventsContext";
import { MagnifierIcon } from "../icons/MagnifierIcon";

export const SearchBar = () => {
  const { updateSearch, search } = useEvents();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateSearch(e.currentTarget.value);
  };

  return (
    <div className="w-full h-12 rounded-xl bg-white border border-ui-secondary flex flex-row items-center p-1 gap-1.5 focus-within:outline-2">
      <div className="w-10 h-10 rounded-lg bg-canvas border border-ui-secondary flex items-center justify-center shrink-0">
        <MagnifierIcon />
      </div>
      <input
        className="px-1 h-full grow text-sm font-normal placeholder:text-text-secondary text-text-primary outline-0"
        placeholder="Search"
        type="text"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};
