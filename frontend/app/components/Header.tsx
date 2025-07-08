import { Filters } from "./Filters";
import { SearchBar } from "./SearchBar";
import { SeedButton } from "./SeedButton";
import { Sort } from "./Sort";

export const Header = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2 lg:gap-4">
      <div className="w-full lg:w-70">
        <SearchBar />
      </div>
      <div className="flex flex-row gap-2 lg:gap-4">
        <div className="w-full lg:w-27.5">
          <Filters />
        </div>
        <div className="w-full lg:w-27.5">
          <Sort />
        </div>
      </div>
      <div className="sm:col-span-2 w-full lg:w-100">
        <SeedButton />
      </div>
    </div>
  );
};
