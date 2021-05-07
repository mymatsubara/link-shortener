import crypto from "crypto"
import { Redis } from "ioredis";
import { SESSION_EXPIRE } from "../consts";
import formatSessionId from "./formatSessionId";

export default async function generateSessionId(redis: Redis, userId: number) {
    let temp, sessionId;
    do {
        sessionId = crypto.randomBytes(64).toString("hex");
        temp = await redis.get(formatSessionId(sessionId));
    } while (temp);    

    await redis.set(formatSessionId(sessionId), userId, "EX", SESSION_EXPIRE)
    return sessionId
}