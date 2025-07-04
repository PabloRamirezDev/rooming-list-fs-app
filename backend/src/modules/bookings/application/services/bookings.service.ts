import { Inject, Injectable } from '@nestjs/common';
import { IBookingsRepository } from '../../domain/interfaces/bookings.repository.interface';
import { BOOKINGS_REPOSITORY } from '../../bookings.constants';
import { Booking } from '../../domain/entities/booking.entity';
import { CreateBookingDTO } from '../dto/create-booking.dto';
import { RoomingListBookingsService } from '../../../rooming-list-bookings/application/services/rooming-list-bookings.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ListBookingsDTO } from '../dto/list-bookings.dto';
import { PaginationUtil } from 'src/shared/pagination/pagination.util';
import { PaginatedResult } from 'src/shared/pagination/paginated-result.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(BOOKINGS_REPOSITORY)
    private readonly repository: IBookingsRepository,
    private readonly roomingListBookingsService: RoomingListBookingsService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
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

    return this.dataSource.transaction(async () => {
      const createResult = await this.repository.create(booking);

      await this.roomingListBookingsService.create({
        bookingId: createResult.bookingId,
        roomingListId: dto.roomingListId,
      });

      return createResult;
    });
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
