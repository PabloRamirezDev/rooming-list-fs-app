"use client";
import { useEvents } from "../context/EventsContext";
import { EventSection } from "./EventSection";
import { EventSectionLoading } from "./EventSectionLoading";

export const Events = () => {
  const { events, isLoading } = useEvents();

  if (isLoading)
    return (
      <div className="flex flex-col gap-12">
        <EventSectionLoading />
        <EventSectionLoading />
        <EventSectionLoading />
      </div>
    );

  if (events?.length === 0) {
    return (
      <div className="flex flex-col gap-12">
        <p className="mx-auto pt-40 text-text-secondary">There are no Events matching your search.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {events?.map((event) => (
        <EventSection
          key={event.eventId}
          eventName={event.eventName}
          roomingLists={event.roomingLists}
        />
      ))}
    </div>
  );
};
