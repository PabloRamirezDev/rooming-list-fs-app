import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  withTransaction<T>(action: () => Promise<T>) {
    return this.dataSource.transaction(action);
  }
}
