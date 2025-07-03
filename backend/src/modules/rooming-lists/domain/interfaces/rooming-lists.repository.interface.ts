import { RoomingList } from '../entities/rooming-list.entity';

export interface IRoomingListsRepository {
  findAll(): Promise<RoomingList[]>;
  findById(id: number): Promise<RoomingList | null>;
  create(booking: Partial<RoomingList>): Promise<RoomingList>;
  delete(id: number): Promise<void>;
}
