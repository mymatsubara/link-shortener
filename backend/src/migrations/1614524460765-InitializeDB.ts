import { Role, User } from "../entities/User";
import {MigrationInterface, QueryRunner} from "typeorm";
import bcrypt from "bcrypt"

export class InitializeDB1614524460765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {  
        const adminPassword = process.env.ADMIN_PASSWORD || "admin" 
        const adminUsername = process.env.ADMIN_USERNAME || "admin"
        console.log(`Creating user: ${adminUsername}`);
        await queryRunner.manager.save(User, {username: adminUsername, password: await bcrypt.hash(adminPassword, 10), role: Role.Admin, email: "admin@test.com"});  
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}
