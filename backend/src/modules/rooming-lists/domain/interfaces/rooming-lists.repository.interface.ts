import { IPagination } from '../../../../shared/pagination/pagination.interface';
import { RoomingList } from '../entities/rooming-list.entity';
import { RoomingListSearch } from '../types/rooming-list-search.type';
import { RoomingListSort } from '../types/rooming-list-sort.type';

export interface IRoomingListsRepository {
  findAllAndCount(
    options: Required<IPagination> & RoomingListSearch & RoomingListSort,
  ): Promise<[RoomingList[], number]>;
  findById(id: number): Promise<RoomingList | null>;
  create(roomingList: Partial<RoomingList>): Promise<RoomingList>;
  bulkCreate(roomingLists: Partial<RoomingList>[]): Promise<void>;
  delete(id: number): Promise<void>;
  deleteAll(): Promise<void>;
}
