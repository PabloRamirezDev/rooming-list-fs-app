import { FilterType } from "../types/filter";

export const defaultFilters: FilterType[] = [
  {
    label: "RFP Status",
    id: "rfp-status",
    options: [
      { id: "active", label: "Active", checked: false },
      { id: "closed", label: "Closed", checked: false },
      { id: "canceled", label: "Canceled", checked: false },
    ],
  },
];
