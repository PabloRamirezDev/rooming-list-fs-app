import { Inject, Injectable } from '@nestjs/common';
import { IBookingsRepository } from '../../domain/interfaces/bookings.repository.interface';
import { BOOKINGS_REPOSITORY } from '../../bookings.constants';
import { Booking } from '../../domain/entities/booking.entity';
import { CreateBookingDTO } from '../dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(BOOKINGS_REPOSITORY)
    private readonly repository: IBookingsRepository,
  ) {}

  async getAll() {
    return this.repository.findAll();
  }

  async get(id: number) {
    return this.repository.findById(id);
  }

  async create(dto: CreateBookingDTO) {
    const booking = new Booking(
      dto.hotelId,
      dto.eventId,
      dto.guestName,
      dto.guestPhoneNumber,
      dto.checkInDate,
      dto.checkOutDate,
    );

    return this.repository.create(booking);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
