import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;
}
