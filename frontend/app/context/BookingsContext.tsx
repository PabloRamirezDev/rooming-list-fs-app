"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

type BookingsContextType = {
  bookings: unknown[];
  error: unknown;
  isLoading: boolean;
  setRoomingListId: (id: number) => void;
};

const BookingsContext = createContext<BookingsContextType | null>(null);

export const useBookings = () => {
  const context = useContext(BookingsContext);

  if (context === null) {
    throw new Error("useBookings must be used within an BookingsProvider");
  }

  return context;
};

interface Props {
  children?: ReactNode;
}

export const BookingsProvider = (props: Props) => {
  const { children } = props;

  const [roomingListId, setRoomingListId] = useState<number | null>(null);

  const { data, error, isLoading } = useSWR<{ bookings: unknown[] }>(
    roomingListId !== null ? `/api/bookings/${roomingListId}` : null,
    fetcher,
    {
      onSuccess: ({ bookings }) => {
        console.log(bookings);
      },
    }
  );

  const { bookings = [] } = data || {};

  return (
    <BookingsContext.Provider
      value={{ bookings, error, isLoading, setRoomingListId }}
    >
      {children}
    </BookingsContext.Provider>
  );
};
