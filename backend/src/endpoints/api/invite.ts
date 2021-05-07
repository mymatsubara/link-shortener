import { API_PATH, FRONTEND_URL, MAIL_ADDRESS, INVITE_EXPIRE } from "../../consts";
import { Role, User } from "../../entities/User";
import Context from "../../interfaces/Context";
import formatEmailToken from "../../utils/formatEmailToken";
import generateEmailToken from "../../utils/generateEmailToken";
import isEmailValid from "../../utils/isEmailValid";
import isUserAdmin from "../../utils/isUserAdmin";
import nodemailer from "nodemailer";
import RedisUserRegister from "../../interfaces/RedisUserRegister";

interface RegisterEmailRequest {
  email: string;
  role?: Role;
}

export default function createPostInvite({
  app,
  dbConn,
  redis,
  mailTransporter,
}: Context) {
  app.post(API_PATH + "/invite", async (req, res) => {
    if (!(await isUserAdmin(req, redis, dbConn))) {
      res.send({
        error:
          "Você não está autorizado para registrar email de novos usuários",
      });
      return;
    }

    const { email, role }: RegisterEmailRequest = req.body;

    if (!isEmailValid(email)) {
      res.send({ error: "Email inválido", source: "email" });
      return;
    }

    if (await dbConn.manager.findOne(User, { email })) {
      res.send({ error: "Email já cadastrado", source: "email" });
      return;
    }

    const emailToken = generateEmailToken();
    const toCache: RedisUserRegister = {
      email,
      role: role === Role.Admin ? Role.Admin : Role.User,
    };
    redis.set(formatEmailToken(emailToken), JSON.stringify(toCache), "EX", INVITE_EXPIRE);

    const info = await mailTransporter.sendMail({
      from: MAIL_ADDRESS,
      to: email,
      subject: "Cadastro para o redirecionador de links",
      html: `<p>Para se cadastrar no redirecionador de links, clique no link a seguir: </p><a href="${FRONTEND_URL}/register?key=${emailToken}">Cadastre-se</a><p>Obs: esse link tem validade de ${INVITE_EXPIRE/86400000} dias.</p>`,
    });

    console.log("Email info: ", nodemailer.getTestMessageUrl(info));
    res.send({ sucess: "Convite enviado com sucesso" });
  });
}

