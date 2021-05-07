import {MigrationInterface, QueryRunner} from "typeorm";

export class TsvectorTrigger1620237126829 implements MigrationInterface {

    public async up(_: QueryRunner): Promise<void> {
        // await queryRunner.manager.query(`
        // ALTER TABLE link
        // DROP COLUMN IF EXISTS search;

        // ALTER TABLE link
        // ADD COLUMN search tsvector GENERATED ALWAYS AS 
        //     (to_tsvector('english', coalesce("basePath", '') || ' ' || coalesce("redirectTo", ''))) 
        // STORED;

        // CREATE INDEX tsvec_idx ON link USING GIN(search);
        // `);
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}
