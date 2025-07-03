import { AgreementType } from '../../domain/enums/agreement-type.enum';
import { RoomingListStatus } from '../../domain/enums/rooming-list-status.enum';

export class CreateRoomingListDTO {
  hotelId: number;

  eventId: number;

  eventName: string;

  rfpName: string;

  cutOffDate: Date;

  status: RoomingListStatus;

  agreementType: AgreementType;
}
