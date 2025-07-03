import { Booking } from '../entities/booking.entity';

export interface IBookingsRepository {
  findAll(): Promise<Booking[]>;
  findById(id: number): Promise<Booking | null>;
  create(booking: Partial<Booking>): Promise<Booking>;
  delete(id: number): Promise<void>;
}
