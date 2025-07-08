import { Booking } from '../../../bookings/domain/entities/booking.entity';

export class BulkCreateRoomingListBookingDTO {
  entries: {
    roomingListId: number;

    bookingId: number;
  }[];
}
