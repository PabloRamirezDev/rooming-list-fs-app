export type FilterType = {
  label: string;
  id: string;
  options: {
    id: string;
    label: string;
    checked: boolean;
  }[];
};