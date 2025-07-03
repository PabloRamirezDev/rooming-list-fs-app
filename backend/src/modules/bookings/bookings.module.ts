import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsRepository } from './infrastructure/repositories/bookings.repository';
import { BookingsService } from './application/services/bookings.service';
import { BOOKINGS_REPOSITORY } from './bookings.constants';
import { BookingEntity } from './infrastructure/typeorm/booking.entity';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  providers: [
    {
      provide: BOOKINGS_REPOSITORY,
      useClass: BookingsRepository,
    },
    BookingsService,
  ],
  controllers: [BookingsController],
})
export class BookingsModule {}
