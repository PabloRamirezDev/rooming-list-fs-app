import { IPagination } from 'src/shared/pagination/pagination.interface';
import { Booking } from '../entities/booking.entity';

export interface IBookingsRepository {
  findAllAndCount(options: Required<IPagination>): Promise<[Booking[], number]>;
  findById(id: number): Promise<Booking | null>;
  create(booking: Partial<Booking>): Promise<Booking>;
  bulkCreate(roomingLists: Partial<Booking>[]): Promise<void>;
  delete(id: number): Promise<void>;
  deleteAll(): Promise<void>
}
