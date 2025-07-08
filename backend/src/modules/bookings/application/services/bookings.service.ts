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
import { TransactionService } from 'src/shared/database/transaction.service';
import { BulkCreateBookingDTO } from '../dto/bulk-create-booking.dto';
import { BookingFactory } from '../../domain/factories/booking.factory';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(BOOKINGS_REPOSITORY)
    private readonly repository: IBookingsRepository,
    private readonly roomingListBookingsService: RoomingListBookingsService,
    private readonly transactionService: TransactionService,
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

    return this.transactionService.withTransaction(async () => {
      const createResult = await this.repository.create(booking);

      await this.roomingListBookingsService.create({
        bookingId: createResult.bookingId,
        roomingListId: dto.roomingListId,
      });

      return createResult;
    });
  }

  async bulkCreate(data: BulkCreateBookingDTO) {
    const bookings = data.entries.map((entry) =>
      BookingFactory.rehydrate(entry),
    );

    return this.repository.bulkCreate(bookings);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async deleteAll() {
    return this.repository.deleteAll();
  }
}
