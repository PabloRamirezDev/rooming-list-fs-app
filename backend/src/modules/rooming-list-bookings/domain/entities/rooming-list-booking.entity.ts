import { Booking } from '../../../bookings/domain/entities/booking.entity';
import { RoomingList } from '../../../rooming-lists/domain/entities/rooming-list.entity';

export class RoomingListBooking {
  constructor(
    public readonly roomingList: RoomingList,
    public readonly booking: Booking,
  ) {}
}
