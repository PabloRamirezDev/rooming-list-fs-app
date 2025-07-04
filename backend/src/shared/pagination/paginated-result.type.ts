export type PaginatedResult<T> = {
  count: number;
  total: number;
  next: string;
  items: T[];
};
