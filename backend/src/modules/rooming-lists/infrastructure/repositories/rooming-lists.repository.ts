import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { IRoomingListsRepository } from '../../domain/interfaces/rooming-lists.repository.interface';
import { RoomingListEntity } from '../typeorm/rooming-list.entity';
import { IPagination } from '../../../../shared/pagination/pagination.interface';
import { RoomingListSearch } from '../../domain/types/rooming-list-search.type';
import { RoomingListSort } from '../../domain/types/rooming-list-sort.type';
import { SortDirection } from '../../../../shared/sort/sort-direction.enum';
import { RoomingListSortField } from '../../domain/enums/rooming-list-sort-field.enum';

@Injectable()
export class RoomingListsRepository implements IRoomingListsRepository {
  constructor(
    @InjectRepository(RoomingListEntity)
    private readonly roomingListRepo: Repository<RoomingListEntity>,
  ) {}

  async findAllAndCount(
    options: Required<IPagination> & RoomingListSearch & RoomingListSort,
  ): Promise<[RoomingListEntity[], number]> {
    const { limit = 10, page = 1 } = options;

    return this.roomingListRepo.findAndCount({
      where: this.getWhere(options),
      skip: (page - 1) * limit,
      take: limit,
      order: this.getOrder(options),
    });
  }

  private getWhere(
    options: RoomingListSearch,
  ): FindOptionsWhere<RoomingListEntity>[] {
    const { search, status } = options;

    if (!search && !status) return;

    const searchItems = [];

    if (search) {
      searchItems.push({ eventName: ILike(`%${search}%`) });
      searchItems.push({ rfpName: ILike(`%${search}%`) });
      searchItems.push({ agreementType: ILike(`%${search}%`) });
    }

    if (status) {
      searchItems.push({ status });
    }

    return searchItems;
  }

  private getOrder(
    options: RoomingListSort,
  ): FindOptionsOrder<RoomingListEntity> {
    const { sortDirection = SortDirection.ASC, sortField } = options;

    switch (sortField) {
      case RoomingListSortField.CUTOFF_DATE:
        return { cutOffDate: sortDirection };
      default:
        return;
    }
  }

  async findById(id: number): Promise<RoomingListEntity | null> {
    return this.roomingListRepo.findOneBy({ roomingListId: id });
  }

  async create(data: Partial<RoomingListEntity>): Promise<RoomingListEntity> {
    const newRoomingList = this.roomingListRepo.create(data);
    return this.roomingListRepo.save(newRoomingList);
  }

  async delete(id: number): Promise<void> {
    await this.roomingListRepo.delete({ roomingListId: id });
  }
}
