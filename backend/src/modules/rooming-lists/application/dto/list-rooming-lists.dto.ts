import { Transform } from 'class-transformer';
import { IPagination } from '../../../../shared/pagination/pagination.interface';
import { transformInteger } from 'src/shared/transformers/transform-integer';
import { RoomingListStatus } from '../../domain/enums/rooming-list-status.enum';
import { RoomingListSortField } from '../../domain/enums/rooming-list-sort-field.enum';
import { SortDirection } from '../../../../shared/sort/sort-direction.enum';
import { transformArray } from 'src/shared/transformers/transform-array';

export class ListRoomingListsDTO implements IPagination {
  search?: string;

  @Transform(transformArray)
  status?: RoomingListStatus[];

  sortField?: RoomingListSortField;

  sortDirection?: SortDirection;

  @Transform(transformInteger)
  limit?: number;

  @Transform(transformInteger)
  page?: number;
}
