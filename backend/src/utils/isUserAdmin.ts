import { Redis } from "ioredis";
import { Connection } from "typeorm";
import { User, Role } from "../entities/User";
import getUserId from "./getUserId";

export default async function isUserAdmin(req: Express.Request, redis: Redis, dbConn: Connection) {
    const reqUserId = await getUserId(req, redis);
    const reqUser = await dbConn.manager.findOne(User, { id: reqUserId });
    return reqUser?.role === Role.Admin;
}