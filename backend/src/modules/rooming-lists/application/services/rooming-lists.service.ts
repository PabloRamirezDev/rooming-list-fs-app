import { Inject, Injectable } from '@nestjs/common';
import { IRoomingListsRepository } from '../../domain/interfaces/rooming-lists.repository.interface';
import { ROOMING_LISTS_REPOSITORY } from '../../rooming-lists.constants';
import { RoomingList } from '../../domain/entities/rooming-list.entity';
import { CreateRoomingListDTO } from '../dto/create-rooming-list.dto';

@Injectable()
export class RoomingListsService {
  constructor(
    @Inject(ROOMING_LISTS_REPOSITORY)
    private readonly repository: IRoomingListsRepository,
  ) {}

  async getAll() {
    return this.repository.findAll();
  }

  async get(id: number) {
    return this.repository.findById(id);
  }

  async create(dto: CreateRoomingListDTO) {
    const roomingList = new RoomingList(
      dto.hotelId,
      dto.eventId,
      dto.eventName,
      dto.rfpName,
      dto.cutOffDate,
      dto.status,
      dto.agreementType,
    );

    return this.repository.create(roomingList);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
