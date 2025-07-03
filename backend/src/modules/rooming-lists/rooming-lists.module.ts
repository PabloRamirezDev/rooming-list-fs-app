import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingListEntity } from './infrastructure/typeorm/rooming-list.entity';
import { ROOMING_LISTS_REPOSITORY } from './rooming-lists.constants';
import { RoomingListsRepository } from './infrastructure/repositories/rooming-lists.repository';
import { RoomingListsService } from './application/services/rooming-lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomingListEntity])],
  providers: [
    {
      provide: ROOMING_LISTS_REPOSITORY,
      useClass: RoomingListsRepository,
    },
    RoomingListsService,
  ],
})
export class RoomingListsModule {}
