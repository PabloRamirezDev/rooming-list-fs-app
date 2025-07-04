import { Inject, Injectable } from '@nestjs/common';
import { IBookingsRepository } from '../../domain/interfaces/bookings.repository.interface';
import { BOOKINGS_REPOSITORY } from '../../bookings.constants';
import { Booking } from '../../domain/entities/booking.entity';
import { CreateBookingDTO } from '../dto/create-booking.dto';
import { ListBookingsDTO } from '../dto/list-bookings.dto';
import { PaginationUtil } from 'src/shared/pagination/pagination.util';
import { PaginatedResult } from 'src/shared/pagination/paginated-result.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(BOOKINGS_REPOSITORY)
    private readonly repository: IBookingsRepository,
    private readonly configService: ConfigService,
  ) {}

  async getAll(
    dto: ListBookingsDTO,
    pathname?: string,
  ): Promise<PaginatedResult<Booking>> {
    return PaginationUtil.addPagination(
      (pagination) => this.repository.findAllAndCount(pagination),
      dto,
      this.configService.get('BASE_URL'),
      pathname,
    );
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
