import { getAllApiItems } from "@/app/lib/get-all-api-items";

type Booking = {
  hotelId: number;
  eventId: number;
  guestName: string;
  guestPhoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
  bookingId: number;
  roomingListId: number;
};

export const getBookings = async (roomingListId: number) => {
  const bookings = await getAllApiItems<Booking>(
    `/rooming-lists/${roomingListId}/bookings`
  );

  return bookings;
};
