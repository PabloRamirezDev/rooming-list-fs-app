import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1751935973786 implements MigrationInterface {
    name = 'InitialMigration1751935973786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "booking" ("bookingId" integer NOT NULL, "hotelId" integer NOT NULL, "eventId" integer NOT NULL, "guestName" character varying NOT NULL, "guestPhoneNumber" character varying NOT NULL, "checkInDate" date NOT NULL, "checkOutDate" date NOT NULL, CONSTRAINT "PK_2aa4ef0259b62eadae336c6df1d" PRIMARY KEY ("bookingId"))`);
        await queryRunner.query(`CREATE TABLE "rooming_list_bookings" ("id" integer NOT NULL, "roomingListId" integer NOT NULL, "bookingId" integer NOT NULL, CONSTRAINT "REL_c6f1bf05b3274108a1cfdc0389" UNIQUE ("bookingId"), CONSTRAINT "PK_c64ccf37c36d4a9decec088931c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooming_list" ("roomingListId" integer NOT NULL, "hotelId" integer NOT NULL, "eventId" integer NOT NULL, "eventName" character varying NOT NULL, "rfpName" character varying NOT NULL, "cutOffDate" date NOT NULL, "status" character varying NOT NULL, "agreementType" character varying NOT NULL, CONSTRAINT "PK_3d9bffec99e6f4d0420e4e33b92" PRIMARY KEY ("roomingListId"))`);
        await queryRunner.query(`ALTER TABLE "rooming_list_bookings" ADD CONSTRAINT "FK_a09396f8215316f201d9bdee0e6" FOREIGN KEY ("roomingListId") REFERENCES "rooming_list"("roomingListId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooming_list_bookings" ADD CONSTRAINT "FK_c6f1bf05b3274108a1cfdc03891" FOREIGN KEY ("bookingId") REFERENCES "booking"("bookingId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooming_list_bookings" DROP CONSTRAINT "FK_c6f1bf05b3274108a1cfdc03891"`);
        await queryRunner.query(`ALTER TABLE "rooming_list_bookings" DROP CONSTRAINT "FK_a09396f8215316f201d9bdee0e6"`);
        await queryRunner.query(`DROP TABLE "rooming_list"`);
        await queryRunner.query(`DROP TABLE "rooming_list_bookings"`);
        await queryRunner.query(`DROP TABLE "booking"`);
    }

}
