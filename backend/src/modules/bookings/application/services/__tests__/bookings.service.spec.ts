import { Booking } from '../../../../../modules/bookings/domain/entities/booking.entity';
import { BookingsService } from '../bookings.service';

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

const mockRoomingListBookingsService = {
  create: jest.fn(),
  bulkCreate: jest.fn(),
  getBookingsByRoomingListId: jest.fn(),
  getRoomingListByBookingId: jest.fn(),
};

const mockTransactionService = {
  withTransaction: jest.fn((fn) => fn()),
};

const mockConfigService = {
  get: jest.fn(),
};

describe('BookingsService', () => {
  const service = new BookingsService(
    mockRepository,
    mockRoomingListBookingsService as any,
    mockTransactionService as any,
    mockConfigService as any,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should retrieve paginated items from the repository', async () => {
      const items = [{ bookingId: 1 }, { bookingId: 2 }];
      const totalCount = 5;

      mockRepository.findAllAndCount.mockResolvedValueOnce([items, totalCount]);

      const result = await service.getAll({}, '/bookings');

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
        roomingListId: 1,
        hotelId: 2,
        eventId: 3,
        guestName: 'test',
        guestPhoneNumber: '555-5555',
        checkInDate: new Date(),
        checkOutDate: new Date(),
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
