import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBookingsRepository } from '../../domain/interfaces/bookings.repository.interface';
import { BookingEntity } from '../typeorm/booking.entity';
import { IPagination } from '../../../../shared/pagination/pagination.interface';
import { Booking } from '../../domain/entities/booking.entity';
import { SequenceService } from '../../../../shared/database/sequence.service';

@Injectable()
export class BookingsRepository implements IBookingsRepository {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepo: Repository<BookingEntity>,
    private readonly sequenceService: SequenceService,
  ) {}

  async findAllAndCount(
    options: Required<IPagination>,
  ): Promise<[BookingEntity[], number]> {
    const { limit, page } = options;

    return this.bookingRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findById(id: number): Promise<BookingEntity | null> {
    return this.bookingRepo.findOneBy({ bookingId: id });
  }

  async create(data: Partial<BookingEntity>): Promise<BookingEntity> {
    const newBooking = this.bookingRepo.create(data);

    const entity = (
      await this.bookingRepo
        .createQueryBuilder()
        .insert()
        .into(BookingEntity)
        .values(newBooking)
        .returning('*')
        .execute()
    ).raw[0] as BookingEntity;

    return entity;
  }

  async bulkCreate(data: Partial<Booking>[]): Promise<void> {
    const entities = this.bookingRepo.create(data);
    await this.bookingRepo.save(entities);

    if (data.some((entry) => entry.bookingId)) {
      await this.sequenceService.updateSequence('booking', 'bookingId');
    }
  }

  async delete(id: number): Promise<void> {
    await this.bookingRepo.delete({ bookingId: id });
  }

  async deleteAll(): Promise<void> {
    await this.bookingRepo.deleteAll();
  }
}
