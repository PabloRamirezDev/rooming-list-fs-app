import { getAllApiItems } from "@/app/lib/get-all-api-items";
import { ApiEvent } from "../../types/api-event";

type RoomingList = {
  roomingListId: number;
  eventId: number;
  eventName: string;
  rfpName: string;
  cutOffDate: string;
  status: string;
  agreementType: string;
};

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

type Params = {
  status?: string | null;
  search?: string | null;
  sortKey?: string | null;
  sortDirection?: string | null;
};

export const getEvents = async (params: Params): Promise<ApiEvent[]> => {
  const apiUrl = getApiUrl(params);

  const roomingLists = await getAllApiItems<RoomingList>(apiUrl);

  const bookings = await getAllApiItems<Booking>("/bookings");

  const roomingIdToBookings = new Map<number, Booking[]>();

  bookings.forEach((item) => {
    const currBookings = roomingIdToBookings.get(item.roomingListId) ?? [];

    roomingIdToBookings.set(item.roomingListId, [...currBookings, item]);
  });

  const eventIdToRoomingLists = new Map<number, ApiEvent["roomingLists"]>();
  const eventIdToEventData = new Map<
    number,
    { eventId: number; eventName: string }
  >();

  roomingLists.forEach((item) => {
    const currLists = eventIdToRoomingLists.get(item.eventId) ?? [];

    const bookings = roomingIdToBookings.get(item.roomingListId) ?? [];

    const [startDate, endDate] = getRoomingListDates(bookings);

    eventIdToRoomingLists.set(item.eventId, [
      ...currLists,
      {
        ...item,
        bookingCount: bookings.length,
        startDate: startDate?.toDateString(),
        endDate: endDate?.toDateString(),
      },
    ]);

    if (!eventIdToEventData.has(item.eventId)) {
      eventIdToEventData.set(item.eventId, {
        eventId: item.eventId,
        eventName: item.eventName,
      });
    }
  });

  const events = eventIdToEventData
    .values()
    .map((item) => ({
      ...item,
      roomingLists: eventIdToRoomingLists.get(item.eventId)!,
    }))
    .toArray();

  return events;
};

const getRoomingListDates = (bookings: Booking[]) => {
  let startDate: Date | null = null;
  let endDate: Date | null = null;

  for (const booking of bookings) {
    const currStartDate = new Date(booking.checkInDate);
    const currEndDate = new Date(booking.checkOutDate);

    if (!startDate || currStartDate.getTime() < startDate.getTime()) {
      startDate = currStartDate;
    }

    if (!endDate || currEndDate.getTime() > endDate.getTime()) {
      endDate = currEndDate;
    }
  }

  return [startDate, endDate];
};

const getApiUrl = (params: Params) => {
  const { search, sortDirection, sortKey, status } = params;

  let url = "/rooming-lists?";

  if (search) {
    url += "search=" + encodeURIComponent(search) + "&";
  }
  const formattedStatus = formatStatus(status);

  if (formattedStatus) {
    url += "status=" + formattedStatus + "&";
  }

  const formattedSortKey = formatSortKey(sortKey);
  const formattedSortDirection = formatSortDirection(sortDirection);

  if (formattedSortKey && formattedSortDirection) {
    url +=
      "sortField=" +
      formattedSortKey +
      "&sortDirection=" +
      formattedSortDirection;
  }

  return url.replace(/(&|\?)$/, "");
};

const sortKeyMap: Record<string, string> = {
  "cutoff-date": "cutOffDate",
};

const formatSortKey = (key?: string | null) => {
  if (!key) return null;

  return sortKeyMap[key] ?? null;
};

const formatSortDirection = (direction?: string | null) => {
  switch (direction) {
    case "asc":
      return "ASC";
    case "desc":
      return "DESC";
    default:
      return null;
  }
};

const formatStatus = (status?: string | null) => {
  const items = status?.split(",");

  return items
    ?.map((item) => {
      switch (item) {
        case "active":
          return "received";
        case "closed":
          return "completed";
        case "canceled":
          return "archived";
        default:
          return null;
      }
    })
    .filter((item) => item);
};
