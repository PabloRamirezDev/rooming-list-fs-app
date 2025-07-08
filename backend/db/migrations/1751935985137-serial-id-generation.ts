import { MigrationInterface, QueryRunner } from 'typeorm';

export class SerialIdGeneration1751935985137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS rooming_list_roomingListId_seq;
            ALTER TABLE rooming_list ALTER COLUMN "roomingListId" SET DEFAULT nextval('rooming_list_roomingListId_seq');
            ALTER SEQUENCE rooming_list_roomingListId_seq OWNED BY rooming_list."roomingListId";
        `);

    await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS booking_bookingId_seq;
            ALTER TABLE booking ALTER COLUMN "bookingId" SET DEFAULT nextval('booking_bookingId_seq');
            ALTER SEQUENCE booking_bookingId_seq OWNED BY booking."bookingId";
        `);

    await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS rooming_list_bookings_id_seq;
            ALTER TABLE rooming_list_bookings ALTER COLUMN id SET DEFAULT nextval('rooming_list_bookings_id_seq');
            ALTER SEQUENCE rooming_list_bookings_id_seq OWNED BY rooming_list_bookings.id;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE rooming_list ALTER COLUMN "roomingListId" DROP DEFAULT;
            DROP SEQUENCE IF EXISTS rooming_list_roomingListId_seq;
        `);
    await queryRunner.query(`
            ALTER TABLE booking ALTER COLUMN "bookingId" DROP DEFAULT;
            DROP SEQUENCE IF EXISTS booking_bookingId_seq;
        `);
    await queryRunner.query(`
            ALTER TABLE rooming_list_bookings ALTER COLUMN id DROP DEFAULT;
            DROP SEQUENCE IF EXISTS rooming_list_bookings_id_seq;
        `);
  }
}
