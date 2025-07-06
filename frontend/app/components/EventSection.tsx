"use client";

import Scrollbar from "react-scrollbars-custom";
import { ApiRoomingList } from "../types/api-rooming-list";
import { EventDivider } from "./EventDivider";
import { RoomingListCard } from "./RoomingListCard";

interface Props {
  eventName: string;
  roomingLists: ApiRoomingList[];
}

export const EventSection = (props: Props) => {
  const { eventName, roomingLists } = props;

  return (
    <div className="group flex flex-col gap-4">
      <EventDivider eventName={eventName} />
      <Scrollbar
        style={{ width: "100%", height: 220 }}
        trackXProps={{ className: "h-1! rounded-sm bg-ui-primary!" }}
        thumbXProps={{
          children: (
            <div className="flex flex-row items-center justify-center w-full h-full gap-4 group-hover:gap-6 group-active:gap-6 duration-200">
              <div className="h-2.5 w-1 rounded-full bg-canvas" />
              <div className="h-2.5 w-1 rounded-full bg-canvas" />
              <div className="h-2.5 w-1 rounded-full bg-canvas" />
            </div>
          ),
          className:
            "group h-4! rounded-sm fixed -translate-y-1.5 bg-ui-primary! hover:bg-secondary! active:bg-secondary! duration-200",
        }}
      >
        <div className="flex flex-row gap-4 pb-4">
          {roomingLists.map((roomingList) => (
            <RoomingListCard
              key={roomingList.roomingListId}
              roomingList={roomingList}
            />
          ))}
        </div>
      </Scrollbar>
    </div>
  );
};
