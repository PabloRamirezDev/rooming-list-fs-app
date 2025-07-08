"use client";

import { Header } from "./components/Header";
import { Events } from "./components/Events";

export default function Home() {
  return (
    <>
      <h1 className="text-xl font-semibold text-text-primary mb-8">
        Rooming List Management: Events
      </h1>
      <div className="mb-6">
        <Header />
      </div>
      <Events />
    </>
  );
}
