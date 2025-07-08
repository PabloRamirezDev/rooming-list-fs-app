import { Module } from '@nestjs/common';
import { BookingsModule } from './modules/bookings/bookings.module';
import { RoomingListsModule } from './modules/rooming-lists/rooming-lists.module';
import { DatabaseModule } from './shared/database/database.module';
import { CommonModule } from './shared/common/common.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    BookingsModule,
    RoomingListsModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
