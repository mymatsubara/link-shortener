import formatSessionId from "../../utils/formatSessionId";
import Context from "../../interfaces/Context";
import { API_PATH } from "../../consts";

export default async function createGetMe({ app, redis }: Context) {
  app.get(API_PATH + "/me", async (req, res) => {
    const sessionId = req.cookies.SESSION_ID;

    if (!sessionId) {
      res.send({});
      return;
    }

    const userId = await redis.get(formatSessionId(sessionId));
    if (!userId) {
      res.send({});
    } else {
      res.send({id: parseInt(userId)});
    }
  });
}
