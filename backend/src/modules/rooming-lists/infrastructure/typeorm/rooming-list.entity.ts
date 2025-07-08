import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { RoomingListStatus } from '../../domain/enums/rooming-list-status.enum';
import { AgreementType } from '../../domain/enums/agreement-type.enum';
import { RoomingListBookingEntity } from '../../../rooming-list-bookings/infrastructure/typeorm/rooming-list-booking.entity';

@Entity({ name: 'rooming_list' })
export class RoomingListEntity {
  @PrimaryColumn({ type: 'int' })
  roomingListId: number;

  @Column()
  hotelId: number;

  @Column()
  eventId: number;

  @Column()
  eventName: string;

  @Column()
  rfpName: string;

  @Column('date')
  cutOffDate: Date;

  @Column()
  status: RoomingListStatus;

  @Column()
  agreementType: AgreementType;

  @OneToMany(() => RoomingListBookingEntity, (rlb) => rlb.roomingList)
  roomingListBookings: RoomingListBookingEntity[];
}
