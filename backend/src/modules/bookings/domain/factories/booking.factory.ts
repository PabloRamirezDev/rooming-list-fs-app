import { Booking } from '../entities/booking.entity';

interface BookingProps {
  bookingId?: number;
  hotelId: number;
  eventId: number;
  guestName: string;
  guestPhoneNumber: string;
  checkInDate: Date;
  checkOutDate: Date;
}

export class BookingFactory {
  static create(props: Omit<BookingProps, 'bookingId'>): Booking {
    return new Booking(
      props.hotelId,
      props.eventId,
      props.guestName,
      props.guestPhoneNumber,
      props.checkInDate,
      props.checkOutDate,
    );
  }

  static rehydrate(props: BookingProps): Booking {
    return new Booking(
      props.hotelId,
      props.eventId,
      props.guestName,
      props.guestPhoneNumber,
      props.checkInDate,
      props.checkOutDate,
      props.bookingId,
    );
  }
}
