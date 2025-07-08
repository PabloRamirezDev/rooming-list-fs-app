import { Inject, Injectable } from '@nestjs/common';
import { IRoomingListsRepository } from '../../domain/interfaces/rooming-lists.repository.interface';
import { ROOMING_LISTS_REPOSITORY } from '../../rooming-lists.constants';
import { RoomingList } from '../../domain/entities/rooming-list.entity';
import { CreateRoomingListDTO } from '../dto/create-rooming-list.dto';
import { ListRoomingListsDTO } from '../dto/list-rooming-lists.dto';
import { PaginatedResult } from '../../../../shared/pagination/paginated-result.type';
import { PaginationUtil } from '../../../../shared/pagination/pagination.util';
import { ConfigService } from '@nestjs/config';
import { BulkCreateRoomingListDTO } from '../dto/bulk-create-rooming-list.dto';
import { RoomingListsFactory } from '../../domain/factories/rooming-lists.factory';

@Injectable()
export class RoomingListsService {
  constructor(
    @Inject(ROOMING_LISTS_REPOSITORY)
    private readonly repository: IRoomingListsRepository,
    private readonly configService: ConfigService,
  ) {}

  async getAll(
    dto: ListRoomingListsDTO,
    pathname?: string,
  ): Promise<PaginatedResult<RoomingList>> {
    return PaginationUtil.addPagination(
      (pagination) =>
        this.repository.findAllAndCount({ ...dto, ...pagination }),
      dto,
      this.configService.get('BASE_URL'),
      pathname,
    );
  }

  async get(id: number) {
    return this.repository.findById(id);
  }

  async create(dto: CreateRoomingListDTO) {
    const roomingList = RoomingListsFactory.create(dto);

    return this.repository.create(roomingList);
  }

  async bulkCreate(data: BulkCreateRoomingListDTO) {
    const roomingLists = data.entries.map((entry) =>
      RoomingListsFactory.rehydrate(entry),
    );

    return this.repository.bulkCreate(roomingLists);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async deleteAll() {
    return this.repository.deleteAll();
  }
}
