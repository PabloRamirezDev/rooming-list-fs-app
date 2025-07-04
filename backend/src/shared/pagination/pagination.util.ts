import { IPagination } from './pagination.interface';

export class PaginationUtil {
  private static DEFAULT_LIMIT = 10;
  private static DEFAULT_PAGE = 1;

  static async addPagination<T>(
    getFn: (pagination: Required<IPagination>) => Promise<[T[], number]>,
    pagination: IPagination,
    baseUrl: string,
    pathname?: string,
  ) {
    const fullPagination = PaginationUtil.getPagination(pagination);

    const [items, total] = await getFn(fullPagination);

    const next = PaginationUtil.getNextUrl(
      fullPagination,
      total,
      baseUrl,
      pathname,
    );

    return {
      count: items.length,
      total,
      next,
      items,
    };
  }

  static getPagination(
    pagination: Partial<IPagination>,
  ): Required<IPagination> {
    return {
      limit: pagination.limit || this.DEFAULT_LIMIT,
      page: pagination.page || this.DEFAULT_PAGE,
    };
  }

  static getNextUrl(
    pagination: Required<IPagination>,
    total: number,
    baseUrl: string,
    pathname?: string,
  ) {
    if (pagination.limit * pagination.page >= total) return null;

    const url = new URL(baseUrl);

    if (pathname) url.pathname = pathname;

    url.searchParams.set('limit', `${pagination.limit}`);
    url.searchParams.set('page', `${pagination.page + 1}`);

    return url.toString();
  }
}
