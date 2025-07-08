import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { MOCK_DATA_PROVIDER } from './seed.constants';
import { FileSystemDataProvider } from './infrastructure/providers/file-system-data.provider';
import { SeedService } from './application/services/seed.service';
import { BookingsModule } from '../bookings/bookings.module';
import { RoomingListsModule } from '../rooming-lists/rooming-lists.module';
import { RoomingListBookingsModule } from '../rooming-list-bookings/rooming-list-bookings.module';
import { DatabaseModule } from '../../shared/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    BookingsModule,
    RoomingListsModule,
    RoomingListBookingsModule,
  ],
  providers: [
    { provide: MOCK_DATA_PROVIDER, useClass: FileSystemDataProvider },
    SeedService,
  ],
  controllers: [SeedController],
})
export class SeedModule {}
