import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingListEntity } from './infrastructure/typeorm/rooming-list.entity';
import { ROOMING_LISTS_REPOSITORY } from './rooming-lists.constants';
import { RoomingListsRepository } from './infrastructure/repositories/rooming-lists.repository';
import { RoomingListsService } from './application/services/rooming-lists.service';
import { RoomingListsController } from './rooming-lists.controller';
import { ConfigModule } from '@nestjs/config';
import { RoomingListBookingsModule } from '../rooming-list-bookings/rooming-list-bookings.module';
import { DatabaseModule } from 'src/shared/database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomingListEntity]),
    ConfigModule,
    forwardRef(() => RoomingListBookingsModule),
    DatabaseModule,
  ],
  providers: [
    {
      provide: ROOMING_LISTS_REPOSITORY,
      useClass: RoomingListsRepository,
    },
    RoomingListsService,
  ],
  controllers: [RoomingListsController],
  exports: [RoomingListsService],
})
export class RoomingListsModule {}
