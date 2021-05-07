import formatSessionId from "../../utils/formatSessionId";
import Context from "../../interfaces/Context";
import { API_PATH, SESSION_COOKIE_CONFIG, SESSION_COOKIE_NAME } from "../../consts";

export default function createDeleteLogout({ app, redis }: Context) {
    app.delete(API_PATH + "/logout", async (req, res) => {
        const sessionId = req.cookies.SESSION_ID;
        if (!sessionId) {
            res.send({error: "Usuário não logado"});
            return;
        }

        const deleted = await redis.del(formatSessionId(sessionId));
        res.cookie(SESSION_COOKIE_NAME, "", { ...SESSION_COOKIE_CONFIG, maxAge: 0 })
        res.send(deleted ? {success: "Usuário deslogado com sucesso"} : {error: "Não foi encontrado usuário para essa sessão"});
    });
  }