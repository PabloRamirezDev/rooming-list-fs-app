import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";

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
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
