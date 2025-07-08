import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoomingListBookingsRepository } from '../../domain/interfaces/rooming-list-bookings.repository.interface';
import { RoomingListBookingEntity } from '../typeorm/rooming-list-booking.entity';
import { Booking } from '../../../bookings/domain/entities/booking.entity';
import { RoomingList } from '../../../rooming-lists/domain/entities/rooming-list.entity';
import { RoomingListBooking } from '../../domain/entities/rooming-list-booking.entity';
import { IPagination } from 'src/shared/pagination/pagination.interface';
import { SequenceService } from 'src/shared/database/sequence.service';

@Injectable()
export class RoomingListBookingsRepository
  implements IRoomingListBookingsRepository
{
  constructor(
    @InjectRepository(RoomingListBookingEntity)
    private readonly roomingListBookingsRepo: Repository<RoomingListBookingEntity>,
    private readonly sequenceService: SequenceService,
  ) {}

  async create(
    roomingListBooking: Partial<RoomingListBookingEntity>,
  ): Promise<RoomingListBooking> {
    const newRoomingListBooking =
      this.roomingListBookingsRepo.create(roomingListBooking);

    const entity = (
      await this.roomingListBookingsRepo
        .createQueryBuilder()
        .insert()
        .into(RoomingListBookingEntity)
        .values(newRoomingListBooking)
        .returning('*')
        .execute()
    ).raw[0] as RoomingListBooking;

    return entity;
  }

  async bulkCreate(
    data: Partial<{
      roomingListId: number;
      bookingId: number;
    }>[],
  ): Promise<void> {
    const entities = this.roomingListBookingsRepo.create(data);
    await this.roomingListBookingsRepo.save(entities);

    await this.sequenceService.updateSequence('rooming_list_bookings', 'id');
  }

  async findAndCountBookingsByRoomingListId(
    roomingListId: number,
    options: Required<IPagination>,
  ): Promise<[Booking[], number]> {
    const { limit, page } = options;

    const [roomingListBookings, total] =
      await this.roomingListBookingsRepo.findAndCount({
        where: {
          roomingList: { roomingListId },
        },
        skip: (page - 1) * limit,
        take: limit,
        relations: ['booking'],
      });

    return [roomingListBookings?.map((entry) => entry.booking), total];
  }

  async findRoomingListByBookingId(bookingId: number): Promise<RoomingList> {
    const roomingListBooking = await this.roomingListBookingsRepo.findOne({
      where: {
        booking: {
          bookingId,
        },
      },
      relations: ['roomingList', 'booking'],
    });

    return roomingListBooking?.roomingList;
  }
}
