import { RoomingList } from '../../../rooming-lists/domain/entities/rooming-list.entity';
import { Booking } from '../../../bookings/domain/entities/booking.entity';
import { RawRoomingListBooking } from '../../../rooming-list-bookings/domain/entities/raw-rooming-list-booking.entity';

export interface IMockDataProvider {
  getBookings(): Promise<Booking[]>;
  getRoomingLists(): Promise<RoomingList[]>;
  getRoomingListBookings(): Promise<RawRoomingListBooking[]>;
}
