export type ApiRoomingList = {
  roomingListId: number;
  rfpName: string;
  cutOffDate: string;
  agreementType: string;
  startDate?: string;
  endDate?: string;
  bookingCount: number;
};
