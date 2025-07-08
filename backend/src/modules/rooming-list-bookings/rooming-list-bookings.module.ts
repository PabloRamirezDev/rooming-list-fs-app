import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingListBookingsService } from './application/services/rooming-list-bookings.service';
import { ROOMING_LIST_BOOKINGS_REPOSITORY } from './rooming-list-bookings.constants';
import { RoomingListBookingEntity } from './infrastructure/typeorm/rooming-list-booking.entity';
import { RoomingListBookingsRepository } from './infrastructure/repositories/rooming-list-bookings.repository';
import { RoomingListsModule } from '../rooming-lists/rooming-lists.module';
import { BookingsModule } from '../bookings/bookings.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../shared/database/database.module';

@Module({
  imports: [
    forwardRef(() => RoomingListsModule),
    forwardRef(() => BookingsModule),
    TypeOrmModule.forFeature([RoomingListBookingEntity]),
    ConfigModule,
    DatabaseModule,
  ],
  providers: [
    RoomingListBookingsService,
    {
      provide: ROOMING_LIST_BOOKINGS_REPOSITORY,
      useClass: RoomingListBookingsRepository,
    },
  ],
  exports: [RoomingListBookingsService],
})
export class RoomingListBookingsModule {}
