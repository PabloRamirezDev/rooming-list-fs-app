import { RoomingListBookingEntity } from 'src/modules/rooming-list-bookings/infrastructure/typeorm/rooming-list-booking.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity({ name: 'booking' })
export class BookingEntity {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @Column()
  hotelId: number;

  @Column()
  eventId: number;

  @Column()
  guestName: string;

  @Column()
  guestPhoneNumber: string;

  @Column('date')
  checkInDate: Date;

  @Column('date')
  checkOutDate: Date;

  @OneToOne(() => RoomingListBookingEntity, (rlb) => rlb.booking)
  roomingListBooking: RoomingListBookingEntity;
}
