import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BookingsService } from './application/services/bookings.service';
import { CreateBookingDTO } from './application/dto/create-booking.dto';
import { RoomingListBookingsService } from '../rooming-list-bookings/application/services/rooming-list-bookings.service';
import { ListBookingsDTO } from './application/dto/list-bookings.dto';

@Controller('/bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly roomingListBookingsService: RoomingListBookingsService,
  ) {}

  @Get()
  async listBookings(@Query() dto: ListBookingsDTO) {
    return this.bookingsService.getAll(dto, '/bookings');
  }

  @Get('/:id')
  async getBooking(@Param('id') id: number) {
    return this.bookingsService.get(id);
  }

  @Post()
  async createBooking(@Body() dto: CreateBookingDTO) {
    return this.bookingsService.create(dto);
  }

  @Delete('/:id')
  async deleteBooking(@Param('id') id: number) {
    return this.bookingsService.delete(id);
  }

  @Get('/:id/rooming-list')
  async getBookingRoomingList(@Param('id') bookingId: number) {
    return this.roomingListBookingsService.getRoomingListByBookingId(bookingId);
  }
}
