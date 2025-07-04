import { Booking } from '../../../bookings/domain/entities/booking.entity';

export class CreateRoomingListBookingDTO {
  roomingListId: number;

  bookingId?: number;

  booking?: Booking;
}
