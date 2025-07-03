import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookingsService } from './application/services/bookings.service';
import { CreateBookingDTO } from './application/dto/create-booking.dto';

@Controller('/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  async listBookings() {
    return this.bookingsService.getAll();
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
}
