import { AgreementType } from '../enums/agreement-type.enum';
import { RoomingListStatus } from '../enums/rooming-list-status.enum';

export class RoomingList {
  constructor(
    public readonly roomingListId: number,
    public readonly hotelId: number,
    public readonly eventId: number,
    public readonly eventName: string,
    public readonly rfpName: string,
    public readonly cutOffDate: Date,
    public readonly status: RoomingListStatus,
    public readonly agreementType: AgreementType,
  ) {}
}
