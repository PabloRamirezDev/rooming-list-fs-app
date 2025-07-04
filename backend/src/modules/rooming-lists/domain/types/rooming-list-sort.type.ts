import { SortDirection } from '../../../../shared/sort/sort-direction.enum';
import { RoomingListSortField } from '../enums/rooming-list-sort-field.enum';

export type RoomingListSort = {
  sortField?: RoomingListSortField;

  sortDirection?: SortDirection;
};
