import { getBookings } from "./get-bookings";

interface Options {
  params: Promise<{ "rooming-list-id": string }>;
}

export const GET = async (_: Request, { params }: Options) => {
  const { "rooming-list-id": rawRoomingListId } = await params;

  const roomingListId = parseInt(rawRoomingListId);

  if (isNaN(roomingListId)) {
    return Response.error();
  }

  const bookings = await getBookings(roomingListId);

  return Response.json({ bookings });
};
