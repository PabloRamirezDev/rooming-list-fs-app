import { RoomingListStatus } from '../enums/rooming-list-status.enum';

export type RoomingListSearch = {
  search?: string;

  status?: RoomingListStatus[];
};
