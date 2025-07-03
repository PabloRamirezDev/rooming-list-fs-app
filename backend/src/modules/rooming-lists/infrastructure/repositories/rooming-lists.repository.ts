import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoomingListsRepository } from '../../domain/interfaces/rooming-lists.repository.interface';
import { RoomingListEntity } from '../typeorm/rooming-list.entity';

@Injectable()
export class RoomingListsRepository implements IRoomingListsRepository {
  constructor(
    @InjectRepository(RoomingListEntity)
    private readonly bookingRepo: Repository<RoomingListEntity>,
  ) {}

  async findAll(): Promise<RoomingListEntity[]> {
    return this.bookingRepo.find();
  }

  async findById(id: number): Promise<RoomingListEntity | null> {
    return this.bookingRepo.findOneBy({ roomingListId: id });
  }

  async create(data: Partial<RoomingListEntity>): Promise<RoomingListEntity> {
    const newBooking = this.bookingRepo.create(data);
    return this.bookingRepo.save(newBooking);
  }

  async delete(id: number): Promise<void> {
    await this.bookingRepo.delete({ roomingListId: id });
  }
}
