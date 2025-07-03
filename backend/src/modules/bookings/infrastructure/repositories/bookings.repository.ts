import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBookingsRepository } from '../../domain/interfaces/bookings.repository.interface';
import { BookingEntity } from '../typeorm/booking.entity';

@Injectable()
export class BookingsRepository implements IBookingsRepository {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepo: Repository<BookingEntity>,
  ) {}

  async findAll(): Promise<BookingEntity[]> {
    return this.bookingRepo.find();
  }

  async findById(id: number): Promise<BookingEntity | null> {
    return this.bookingRepo.findOneBy({ bookingId: id });
  }

  async create(data: Partial<BookingEntity>): Promise<BookingEntity> {
    const newBooking = this.bookingRepo.create(data);
    return this.bookingRepo.save(newBooking);
  }

  async delete(id: number): Promise<void> {
    await this.bookingRepo.delete({ bookingId: id });
  }
}
