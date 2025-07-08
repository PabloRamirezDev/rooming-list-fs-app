export class BulkCreateBookingDTO {
  entries: {
    bookingId?: number;

    hotelId: number;

    eventId: number;

    guestName: string;

    guestPhoneNumber: string;

    checkInDate: Date;

    checkOutDate: Date;
  }[];
}
