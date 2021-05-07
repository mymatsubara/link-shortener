import { Redis } from "ioredis";
import formatSessionId from "./formatSessionId";

export default async function getUserId(req : any, redis: Redis) {
    const sessionId = req.cookies.SESSION_ID;
    if (!sessionId) {
        return undefined;
    }
    const userId = await redis.get(formatSessionId(sessionId));
    return !userId ? undefined : parseInt(userId);
}