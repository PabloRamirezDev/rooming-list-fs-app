import { Controller, Get } from '@nestjs/common';
import { SeedService } from './application/services/seed.service';

@Controller('/seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async seed() {
    return this.seedService.seed();
  }
}
