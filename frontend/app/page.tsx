import { EventSection } from "./components/EventSection";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <h1 className="text-xl font-semibold text-text-primary mb-8">
        Rooming List Management: Events
      </h1>
      <div className="mb-6">
        <Header />
      </div>
      <div className="flex flex-col gap-12">
        <EventSection
          eventName="Austin City Limits"
          roomingLists={[
            {
              agreementType: "Staff",
              bookingCount: 34,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 1,
            },
            {
              agreementType: "Leisure",
              bookingCount: 103,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 2,
            },
            {
              agreementType: "Artists",
              bookingCount: 20,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 3,
            },
            {
              agreementType: "Staff",
              bookingCount: 34,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 4,
            },
            {
              agreementType: "Leisure",
              bookingCount: 103,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 5,
            },
            {
              agreementType: "Artists",
              bookingCount: 20,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 6,
            },
          ]}
        />
        <EventSection
          eventName="Ultra Musical Festival"
          roomingLists={[
            {
              agreementType: "Staff",
              bookingCount: 13,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 1,
            },
            {
              agreementType: "Leisure",
              bookingCount: 342,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 2,
            },
            {
              agreementType: "Artists",
              bookingCount: 2,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 3,
            },
            {
              agreementType: "Staff",
              bookingCount: 13,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 4,
            },
            {
              agreementType: "Leisure",
              bookingCount: 342,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 5,
            },
            {
              agreementType: "Artists",
              bookingCount: 2,
              cutOffDate: new Date("2025-01-08"),
              startDate: new Date("2025-01-31"),
              endDate: new Date("2025-02-02"),
              rfpName: "[RFP NAME]",
              roomingListId: 6,
            },
          ]}
        />
      </div>
    </>
  );
}
