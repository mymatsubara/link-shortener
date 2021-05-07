import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import Context from "../../interfaces/Context";
import generateSessionId from "../../utils/generateSessionId";
import {
  API_PATH,
  SESSION_COOKIE_CONFIG,
  SESSION_COOKIE_NAME,
  __prod__,
} from "../../consts";

export default function createPostLogin({ app, dbConn, redis }: Context) {
  app.post(API_PATH + "/login", async (req, res) => {
    const username = req.body?.username;
    const password = req.body?.password;

    if (username == undefined || password == undefined) {
      res.send({ error: "Invalid request format" });
      return;
    }

    const user = await dbConn.manager.findOne(User, { username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const sessionId = await generateSessionId(redis, user.id);

      res.cookie(SESSION_COOKIE_NAME, sessionId, SESSION_COOKIE_CONFIG);
      res.send({ id: user.id, username: user.username, role: user.role });
    } else {
      res.send({ error: "Usuario ou senha incorreto" });
    }
  });
}
