import { RoomingListEntity } from 'src/modules/rooming-lists/infrastructure/typeorm/rooming-list.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingEntity } from 'src/modules/bookings/infrastructure/typeorm/booking.entity';

@Entity({ name: 'rooming_list_bookings' })
export class RoomingListBookingEntity {
  @PrimaryGeneratedColumn('increment')
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
