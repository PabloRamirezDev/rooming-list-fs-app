export class Booking {
  public bookingId: number;

  constructor(
    public readonly hotelId: number,
    public readonly eventId: number,
    public readonly guestName: string,
    public readonly guestPhoneNumber: string,
    public readonly checkInDate: Date,
    public readonly checkOutDate: Date,
  ) {}
}
