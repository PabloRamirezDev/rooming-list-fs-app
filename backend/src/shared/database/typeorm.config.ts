import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  url: configService.get('DB_URL'),
  entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
  synchronize: false,
});
