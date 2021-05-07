import { API_PATH, FRONTEND_URL, INVITE_EXPIRE, MAIL_ADDRESS } from "../../consts";
import { User } from "../../entities/User";
import Context from "../../interfaces/Context";
import anonymizeEmail from "../../utils/anonymizeEmail";
import formatForgotPasswordToken from "../../utils/formatForgotPasswordToken";
import generateEmailToken from "../../utils/generateEmailToken";
import nodemailer from "nodemailer"

interface ForgotPasswordRequest {
    username?: string;
}

export default function createPostForgotPassword({ app, redis, dbConn, mailTransporter }: Context) {
    app.post(API_PATH + "/forgotPassword", async (req, res) => {
        const { username}: ForgotPasswordRequest  = req.body;

        if (!username) {
            res.send({error: "Usuário não foi inserido", source: "username"})
            return
        }

        const user = await dbConn.manager.findOne(User, {username})

        if (!user) {
            res.send({error: "Usuário não cadastrado", source: "username"})
            return;
        }

        const token = generateEmailToken();
        redis.set(formatForgotPasswordToken(token), user.id, "EX",INVITE_EXPIRE);

        const info = await mailTransporter.sendMail({            
            to: user.email,
            from: MAIL_ADDRESS,   
            subject: "Esqueci minha senha",
            html: `<p>Caso você queira cadastrar uma nova senha, clique no link a seguir: </p><a href="${FRONTEND_URL}/changePassword?key=${token}">Nova senha</a><p>Obs: esse link tem validade de ${INVITE_EXPIRE/86400000} dias.</p>`,    
        })

        console.log("Email info: ", nodemailer.getTestMessageUrl(info));

        res.send({success: `Email enviado com sucesso para ${anonymizeEmail(user.email)}`});
    })
}
