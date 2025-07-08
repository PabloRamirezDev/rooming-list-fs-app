import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";
import { EventsProvider } from "./context/EventsContext";
import { BookingsProvider } from "./context/BookingsContext";

export const metadata: Metadata = {
  title: "Rooming List Management App",
  description: "To manage rooming lists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased px-8 py-11.5`}>
        <EventsProvider>
          <BookingsProvider>{children}</BookingsProvider>
        </EventsProvider>
      </body>
    </html>
  );
}
