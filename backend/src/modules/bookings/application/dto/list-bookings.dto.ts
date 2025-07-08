import { Transform } from 'class-transformer';
import { IPagination } from '../../../../shared/pagination/pagination.interface';
import { transformInteger } from '../../../../shared/transformers/transform-integer';

export class ListBookingsDTO implements IPagination {
  @Transform(transformInteger)
  limit?: number;

  @Transform(transformInteger)
  page?: number;
}
