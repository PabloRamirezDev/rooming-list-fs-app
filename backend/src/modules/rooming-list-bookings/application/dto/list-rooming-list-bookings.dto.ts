import { Transform } from 'class-transformer';
import { IPagination } from 'src/shared/pagination/pagination.interface';
import { transformInteger } from 'src/shared/transformers/transform-integer';

export class ListRoomingListBookingsDTO implements IPagination {
  @Transform(transformInteger)
  limit?: number;

  @Transform(transformInteger)
  page?: number;
}
