import { Connection } from "typeorm";
import { Express } from "express"
import { Redis } from "ioredis";
import Mail from "nodemailer/lib/mailer";

export default interface Context {
    app: Express;
    dbConn: Connection;
    redis: Redis;
    mailTransporter: Mail;
}