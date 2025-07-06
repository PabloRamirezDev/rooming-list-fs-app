import { FilterGroup } from "./FilterGroup";
import { Filters } from "./Filters";
import { SearchBar } from "./SearchBar";

export const Header = () => {
  return (
    <div className="flex flex-row gap-4">
      <SearchBar />
      <Filters>
        <FilterGroup
          filterName="RFP Status"
          options={[
            { id: "active", label: "Active", checked: false },
            { id: "closed", label: "Label", checked: true },
            { id: "canceled", label: "Canceled", checked: false },
          ]}
        />
      </Filters>
    </div>
  );
};
