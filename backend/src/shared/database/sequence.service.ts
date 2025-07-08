import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class SequenceService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async updateSequence(table: string, column: string) {
    await this.dataSource.query(`
        SELECT setval(
          pg_get_serial_sequence('${table}', '${column}'),
          (SELECT MAX("${column}") FROM ${table})
        );  
      `);
  }
}
