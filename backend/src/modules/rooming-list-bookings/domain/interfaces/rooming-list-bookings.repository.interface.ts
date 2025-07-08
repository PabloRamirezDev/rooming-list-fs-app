import { RoomingList } from '../../../rooming-lists/domain/entities/rooming-list.entity';
import { Booking } from '../../../bookings/domain/entities/booking.entity';
import { RoomingListBooking } from '../entities/rooming-list-booking.entity';
import { IPagination } from 'src/shared/pagination/pagination.interface';
import { RawRoomingListBooking } from '../entities/raw-rooming-list-booking.entity';

export interface IRoomingListBookingsRepository {
  create(
    roomingListBooking: Partial<RoomingListBooking>,
  ): Promise<RoomingListBooking>;
  bulkCreate(
    roomingListBookings: Partial<RawRoomingListBooking>[],
  ): Promise<void>;
  findAndCountBookingsByRoomingListId(
    roomingListId: number,
    options: Required<IPagination>,
  ): Promise<[Booking[], number]>;
  findRoomingListByBookingId(bookingId: number): Promise<RoomingList>;
}
