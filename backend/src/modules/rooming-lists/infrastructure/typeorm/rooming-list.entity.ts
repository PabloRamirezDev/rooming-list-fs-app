import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RoomingListStatus } from '../../domain/enums/rooming-list-status.enum';
import { AgreementType } from '../../domain/enums/agreement-type.enum';

@Entity({ name: 'rooming_list' })
export class RoomingListEntity {
  @PrimaryGeneratedColumn('increment')
  roomingListId: number;

  @Column()
  hotelId: number;

  @Column()
  eventId: number;

  @Column()
  eventName: string;

  @Column()
  rfpName: string;

  @Column()
  cutOffDate: Date;

  @Column()
  status: RoomingListStatus;

  @Column()
  agreementType: AgreementType;
}
