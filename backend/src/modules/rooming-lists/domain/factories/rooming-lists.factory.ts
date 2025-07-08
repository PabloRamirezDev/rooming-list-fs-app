import { RoomingList } from '../entities/rooming-list.entity';
import { AgreementType } from '../enums/agreement-type.enum';
import { RoomingListStatus } from '../enums/rooming-list-status.enum';

interface RoomingListProps {
  hotelId: number;
  eventId: number;
  eventName: string;
  rfpName: string;
  cutOffDate: Date;
  status: RoomingListStatus;
  agreementType: AgreementType;
  roomingListId?: number;
}

export class RoomingListsFactory {
  static create(props: Omit<RoomingListProps, 'roomingListId'>): RoomingList {
    return new RoomingList(
      props.hotelId,
      props.eventId,
      props.eventName,
      props.rfpName,
      props.cutOffDate,
      props.status,
      props.agreementType,
    );
  }

  static rehydrate(props: RoomingListProps): RoomingList {
    return new RoomingList(
      props.hotelId,
      props.eventId,
      props.eventName,
      props.rfpName,
      props.cutOffDate,
      props.status,
      props.agreementType,
      props.roomingListId,
    );
  }
}
