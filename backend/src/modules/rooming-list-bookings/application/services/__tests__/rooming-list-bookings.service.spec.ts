import { Booking } from '../../../../bookings/domain/entities/booking.entity';
import { RoomingListBookingsService } from '../rooming-list-bookings.service';

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
  findAndCountBookingsByRoomingListId: jest.fn(),
  findRoomingListByBookingId: jest.fn(),
};

const mockRoomingListsService = {
  get: jest.fn(),
};

const mockBookingsService = {
  get: jest.fn(),
};

const mockConfigService = {
  get: jest.fn(),
};

describe('BookingsService', () => {
  const service = new RoomingListBookingsService(
    mockRepository,
    mockRoomingListsService as any,
    mockBookingsService as any,
    mockConfigService as any,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an item in the repository', async () => {
      const dto = {
        roomingListId: 1,
        bookingId: 2,
      };

      const mockRoomingList = {
        roomingListId: 1,
      };

      mockRoomingListsService.get.mockResolvedValueOnce(mockRoomingList);

      await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalled();
    });
  });

  describe('bulkCreate', () => {
    it('should create items in the repository', async () => {
      const data = {
        entries: [
          { bookingId: 1, roomingListId: 10 },
          { bookingId: 2, roomingListId: 20 },
        ],
      };

      await service.bulkCreate(data as any);

      expect(mockRepository.bulkCreate).toHaveBeenCalled();
    });
  });

  describe('getBookingsByRoomingListId', () => {
    it('should retrieve a paginated list of matching bookings', async () => {
      const items = [{ bookingId: 1 }, { bookingId: 2 }];

      mockRepository.findAndCountBookingsByRoomingListId.mockResolvedValueOnce([
        items,
        5,
      ]);

      const result = await service.getBookingsByRoomingListId(1, {});

      expect(result.items).toEqual(items);
      expect(result.total).toBe(5);
      expect(result.count).toBe(items.length);
    });
  });

  describe('getRoomingListByBookingId', () => {
    it('should retrieve a rooming list from the repository', async () => {
      const item = { roomingListId: 10 };

      mockRepository.findRoomingListByBookingId.mockResolvedValueOnce(item);

      const result = await service.getRoomingListByBookingId(1);

      expect(result).toEqual(item);
    });
  });
});
