import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsRepository } from './infrastructure/repositories/bookings.repository';
import { BookingsService } from './application/services/bookings.service';
import { BOOKINGS_REPOSITORY } from './bookings.constants';
import { BookingEntity } from './infrastructure/typeorm/booking.entity';
import { BookingsController } from './bookings.controller';
import { RoomingListBookingsModule } from '../rooming-list-bookings/rooming-list-bookings.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    forwardRef(() => RoomingListBookingsModule),
    ConfigModule,
  ],
  providers: [
    {
      provide: BOOKINGS_REPOSITORY,
      useClass: BookingsRepository,
    },
    BookingsService,
  ],
  controllers: [BookingsController],
  exports: [BookingsService],
})
export class BookingsModule {}
