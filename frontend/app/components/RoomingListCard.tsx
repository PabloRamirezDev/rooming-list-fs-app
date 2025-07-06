import { CalendarIcon } from "../icons/CalendarIcon";
import { ViewDocumentIcon } from "../icons/ViewDocumentIcon";
import { formatTimeInterval } from "../lib/format-time-interval";
import { ApiRoomingList } from "../types/api-rooming-list";
import { DateIndicator } from "./DateIndicator";

interface Props {
  roomingList: ApiRoomingList;
}

export const RoomingListCard = (props: Props) => {
  const { roomingList } = props;

  const {
    rfpName,
    agreementType,
    startDate,
    endDate,
    cutOffDate,
    bookingCount,
  } = roomingList;

  return (
    <div className="w-[400px] shrink-0 bg-white border border-ui-secondary rounded-lg p-3.75 flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold">{rfpName}</h3>
          <p className="font-medium text-sm">
            Agreement:{" "}
            <strong className="font-extrabold">{agreementType}</strong>
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <DateIndicator date={cutOffDate} />
          <p className="text-xs font-medium text-text-secondary">
            Cut-Off Date
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-1">
          <CalendarIcon />
          <p className="text-xs font-normal text-text-secondary">
            {formatTimeInterval(startDate, endDate)}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <button className="text-sm font-semibold text-white bg-primary py-2.5 rounded-lg grow">
            View Bookings ({bookingCount})
          </button>
          <button className="w-10 rounded-lg border-[1.5px] border-primary flex items-center justify-center">
            <ViewDocumentIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
