import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoomingListsRepository } from '../../domain/interfaces/rooming-lists.repository.interface';
import { RoomingListEntity } from '../typeorm/rooming-list.entity';
import { IPagination } from '../../../../shared/pagination/pagination.interface';
import { RoomingListSearch } from '../../domain/types/rooming-list-search.type';
import { RoomingListSort } from '../../domain/types/rooming-list-sort.type';
import { SequenceService } from 'src/shared/database/sequence.service';

@Injectable()
export class RoomingListsRepository implements IRoomingListsRepository {
  constructor(
    @InjectRepository(RoomingListEntity)
    private readonly roomingListRepo: Repository<RoomingListEntity>,
    private readonly sequenceService: SequenceService,
  ) {}

  async findAllAndCount(
    options: Required<IPagination> & RoomingListSearch & RoomingListSort,
  ): Promise<[RoomingListEntity[], number]> {
    const {
      limit = 10,
      page = 1,
      search,
      sortDirection,
      sortField,
      status,
    } = options;

    const query = this.roomingListRepo.createQueryBuilder('roomingList');

    if (search) {
      query.andWhere(
        `(
          roomingList.eventName ILIKE :search OR 
          roomingList.rfpName ILIKE :search OR 
          roomingList.agreementType ILIKE :search
        )`,
        { search: `%${search}%` },
      );
    }

    if (status && status.length > 0) {
      query.andWhere('roomingList.status IN (:...status)', { status });
    }

    query.skip((page - 1) * limit).take(limit);

    if (sortDirection && sortField) {
      query.orderBy(
        `roomingList.${sortField}`,
        sortDirection.toUpperCase() as 'ASC' | 'DESC',
      );
    }

    return query.getManyAndCount();
  }

  async findById(id: number): Promise<RoomingListEntity | null> {
    return this.roomingListRepo.findOneBy({ roomingListId: id });
  }

  async create(data: Partial<RoomingListEntity>): Promise<RoomingListEntity> {
    const newRoomingList = this.roomingListRepo.create(data);

    const entity = (
      await this.roomingListRepo
        .createQueryBuilder()
        .insert()
        .into(RoomingListEntity)
        .values(newRoomingList)
        .returning('*')
        .execute()
    ).raw[0] as RoomingListEntity;

    return entity;
  }

  async bulkCreate(data: Partial<RoomingListEntity>[]): Promise<void> {
    const entities = this.roomingListRepo.create(data);
    await this.roomingListRepo.save(entities);

    if (data.some((entry) => entry.roomingListId)) {
      await this.sequenceService.updateSequence(
        'rooming_list',
        'roomingListId',
      );
    }
  }

  async delete(id: number): Promise<void> {
    await this.roomingListRepo.delete({ roomingListId: id });
  }

  async deleteAll(): Promise<void> {
    await this.roomingListRepo.deleteAll();
  }
}
