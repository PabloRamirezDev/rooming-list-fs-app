import { Inject, Injectable } from '@nestjs/common';
import { BookingsService } from '../../../bookings/application/services/bookings.service';
import { RoomingListBookingsService } from '../../../rooming-list-bookings/application/services/rooming-list-bookings.service';
import { RoomingListsService } from '../../../rooming-lists/application/services/rooming-lists.service';
import { MOCK_DATA_PROVIDER } from '../../seed.constants';
import { IMockDataProvider } from '../interfaces/mock-data-provider.interface';
import { TransactionService } from '../../../../shared/database/transaction.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly roomingListsService: RoomingListsService,
    private readonly roomingListBookingsService: RoomingListBookingsService,
    @Inject(MOCK_DATA_PROVIDER)
    private readonly mockDataProvider: IMockDataProvider,
    private readonly transactionService: TransactionService,
  ) {}

  async seed() {
    await this.transactionService.withTransaction(async () => {
      await this.roomingListsService.deleteAll();
      await this.bookingsService.deleteAll();

      const roomingLists = await this.mockDataProvider.getRoomingLists();

      await this.roomingListsService.bulkCreate({ entries: roomingLists });

      const bookings = await this.mockDataProvider.getBookings();

      await this.bookingsService.bulkCreate({ entries: bookings });

      const roomingListBookings =
        await this.mockDataProvider.getRoomingListBookings();

      await this.roomingListBookingsService.bulkCreate({
        entries: roomingListBookings,
      });
    });
  }
}
