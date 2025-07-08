import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IRoomingListBookingsRepository } from '../../domain/interfaces/rooming-list-bookings.repository.interface';
import { ROOMING_LIST_BOOKINGS_REPOSITORY } from '../../rooming-list-bookings.constants';
import { CreateRoomingListBookingDTO } from '../dto/create-rooming-list-booking.dto';
import { RoomingListBooking } from '../../domain/entities/rooming-list-booking.entity';
import { RoomingListsService } from '../../../rooming-lists/application/services/rooming-lists.service';
import { BookingsService } from '../../../bookings/application/services/bookings.service';
import { ListRoomingListBookingsDTO } from '../dto/list-rooming-list-bookings.dto';
import { PaginationUtil } from 'src/shared/pagination/pagination.util';
import { ConfigService } from '@nestjs/config';
import { BulkCreateRoomingListBookingDTO } from '../dto/bulk-create-rooming-list-booking.dto';

@Injectable()
export class RoomingListBookingsService {
  constructor(
    @Inject(ROOMING_LIST_BOOKINGS_REPOSITORY)
    private readonly roomingListBookingsRepository: IRoomingListBookingsRepository,
    private readonly roomingListsService: RoomingListsService,
    @Inject(forwardRef(() => BookingsService))
    private readonly bookingsService: BookingsService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateRoomingListBookingDTO) {
    const roomingList = await this.roomingListsService.get(dto.roomingListId);

    if (!roomingList) throw new NotFoundException('Rooming List Not Found');

    const booking =
      dto.booking || (await this.bookingsService.get(dto.bookingId));

    const roomingListBooking = new RoomingListBooking(roomingList, booking);

    return this.roomingListBookingsRepository.create(roomingListBooking);
  }

  async bulkCreate(data: BulkCreateRoomingListBookingDTO) {
    this.roomingListBookingsRepository.bulkCreate(data.entries);
  }

  getBookingsByRoomingListId(
    roomingListId: number,
    dto: ListRoomingListBookingsDTO,
    pathname?: string,
  ) {
    return PaginationUtil.addPagination(
      (pagination) =>
        this.roomingListBookingsRepository.findAndCountBookingsByRoomingListId(
          roomingListId,
          pagination,
        ),
      dto,
      this.configService.get('BASE_URL'),
      pathname,
    );
  }

  getRoomingListByBookingId(bookingId: number) {
    return this.roomingListBookingsRepository.findRoomingListByBookingId(
      bookingId,
    );
  }
}
