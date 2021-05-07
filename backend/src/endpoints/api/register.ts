import bcrypt from "bcrypt";
import { API_PATH, SESSION_COOKIE_CONFIG, SESSION_COOKIE_NAME } from "../../consts";
import { User } from "../../entities/User";
import Context from "../../interfaces/Context";
import formatEmailToken from "../../utils/formatEmailToken";
import RedisUserRegister from "../../interfaces/RedisUserRegister";
import generateSessionId from "../../utils/generateSessionId"

type RegisterRequest = Pick<User, "username" | "password" | "role"> & { key: string }

export default function createPostRegister({ app, dbConn, redis }: Context) {
  app.post(API_PATH + "/register", async (req, res) => {
    let { username, password, key }: RegisterRequest = req.body;

    if (!username || !password || !key) {
        res.send({error: "Requisição deve ser no formato: {username, password, key}"})
        return;
    }

    const redisKey = formatEmailToken(key);
    const userInfo = await redis.get(redisKey);
    if (!userInfo) {
      res.send({error: "Chave inválida. Peça uma nova para o administrador."})
      return;
    }
    const {email, role}: RedisUserRegister = JSON.parse(userInfo)

    try {
      password = await bcrypt.hash(password, 10);
      const user = (await dbConn.getRepository(User).createQueryBuilder().insert().values({ username, password, email, role }).returning(["id", "username", "role"]).execute()).raw[0];
      const sessionId = await generateSessionId(redis, user.id);
      res.cookie(SESSION_COOKIE_NAME, sessionId, SESSION_COOKIE_CONFIG);
      res.send(user);
      redis.del(redisKey);
    } catch (e) {
      if (e.code == "23505") {
        res.send({ error: "Usuário em uso", source: "username" });
        return;
      }
      console.log(e);
      res.send({ error: "Erro inesperado ocorreu" });
    }
  });
}
