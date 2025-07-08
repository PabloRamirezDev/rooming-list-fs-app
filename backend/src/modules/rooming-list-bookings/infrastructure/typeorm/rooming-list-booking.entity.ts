import { RoomingListEntity } from '../../../../modules/rooming-lists/infrastructure/typeorm/rooming-list.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BookingEntity } from '../../../../modules/bookings/infrastructure/typeorm/booking.entity';

@Entity({ name: 'rooming_list_bookings' })
export class RoomingListBookingEntity {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => RoomingListEntity, (rl) => rl.roomingListBookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roomingListId' })
  roomingList: RoomingListEntity;

  @Column()
  roomingListId: number;

  @OneToOne(() => BookingEntity, (b) => b.roomingListBooking, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookingId' })
  booking: BookingEntity;

  @Column()
  bookingId: number;
}
