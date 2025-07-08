import { ApiRoomingList } from "./api-rooming-list";

export interface ApiEvent {
  eventId: number;
  eventName: string;
  roomingLists: ApiRoomingList[];
}
