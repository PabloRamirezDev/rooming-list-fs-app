import { Injectable } from '@nestjs/common';
import { IMockDataProvider } from '../../application/interfaces/mock-data-provider.interface';
import { Booking } from '../../../bookings/domain/entities/booking.entity';
import { RoomingList } from '../../../rooming-lists/domain/entities/rooming-list.entity';
import { RawRoomingListBooking } from '../../../rooming-list-bookings/domain/entities/raw-rooming-list-booking.entity';
import fs from 'fs/promises';
import path from 'path';

@Injectable()
export class FileSystemDataProvider implements IMockDataProvider {
  async getBookings(): Promise<Booking[]> {
    return this.readFile('bookings.json');
  }

  async getRoomingLists(): Promise<RoomingList[]> {
    return this.readFile('rooming-lists.json');
  }

  async getRoomingListBookings(): Promise<RawRoomingListBooking[]> {
    return this.readFile('rooming-list-bookings.json');
  }

  private async readFile<T>(filename: string): Promise<T[]> {
    const rawData = await fs.readFile(
      path.join(__dirname, '../data', filename),
      'utf-8',
    );

    const data = JSON.parse(rawData) as T[];

    return data;
  }
}
