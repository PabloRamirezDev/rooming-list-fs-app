import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoomingListsService } from './application/services/rooming-lists.service';
import { CreateRoomingListDTO } from './application/dto/create-rooming-list.dto';

@Controller('/rooming-lists')
export class RoomingListsController {
  constructor(private readonly roomingListsService: RoomingListsService) {}

  @Get()
  async listRoomingLists() {
    return this.roomingListsService.getAll();
  }

  @Get('/:id')
  async getRoomingList(@Param('id') id: number) {
    return this.roomingListsService.get(id);
  }

  @Post()
  async createBooking(@Body() dto: CreateRoomingListDTO) {
    return this.roomingListsService.create(dto);
  }

  @Delete('/:id')
  async deleteBooking(@Param('id') id: number) {
    return this.roomingListsService.delete(id);
  }
}
