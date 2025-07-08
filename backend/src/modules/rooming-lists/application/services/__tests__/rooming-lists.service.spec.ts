import { RoomingListStatus } from '../../../../../modules/rooming-lists/domain/enums/rooming-list-status.enum';
import { RoomingListsService } from '../rooming-lists.service';
import { AgreementType } from '../../../../../modules/rooming-lists/domain/enums/agreement-type.enum';

jest.mock('../../../../../shared/pagination/pagination.util', () => ({
  PaginationUtil: {
    addPagination: jest.fn(async (fn) => {
      const [items, total] = await fn({});

      return { items, total, count: items.length };
    }),
  },
}));

const mockRepository = {
  bulkCreate: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  deleteAll: jest.fn(),
  findAllAndCount: jest.fn().mockResolvedValue([[], 0]),
  findById: jest.fn(),
};

const mockConfigService = {
  get: jest.fn(),
};

describe('BookingsService', () => {
  const service = new RoomingListsService(
    mockRepository,
    mockConfigService as any,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should retrieve paginated items from the repository', async () => {
      const items = [{ roomingListId: 1 }, { roomingListId: 2 }];
      const totalCount = 5;

      mockRepository.findAllAndCount.mockResolvedValueOnce([items, totalCount]);

      const result = await service.getAll({}, '/rooming-lists');

      expect(result.items).toEqual(items);
      expect(result.total).toBe(totalCount);
      expect(result.count).toBe(items.length);
    });
  });

  describe('get', () => {
    it('should retrieve a single item from the repository', async () => {
      const item = { bookingId: 1 };

      mockRepository.findById.mockResolvedValueOnce(item);

      const result = await service.get(1);

      expect(result).toEqual(item);
    });
  });

  describe('create', () => {
    it('should create an item in the repository', async () => {
      const dto = {
        hotelId: 2,
        eventId: 3,
        eventName: 'test',
        rfpName: 'test',
        cutOffDate: new Date(),
        status: RoomingListStatus.archived,
        agreementType: AgreementType.artist,
      };

      const mockRepositoryResult = {
        bookingId: 1,
      };

      mockRepository.create.mockResolvedValueOnce(mockRepositoryResult);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalled();
      expect(result).toEqual(mockRepositoryResult);
    });
  });

  describe('bulkCreate', () => {
    it('should create items in the repository', async () => {
      const data = { entries: [{ bookingId: 1 }, { bookingId: 2 }] };

      await service.bulkCreate(data as any);

      expect(mockRepository.bulkCreate).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete an item in the repository', async () => {
      const id = 1;

      await service.delete(id);

      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('deleteAll', () => {
    it('should delete all items in the repository', async () => {
      await service.deleteAll();

      expect(mockRepository.deleteAll).toHaveBeenCalled();
    });
  });
});
