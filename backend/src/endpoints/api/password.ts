import { API_PATH } from "../../consts";
import bcrypt from "bcrypt"
import Context from "../../interfaces/Context";
import formatForgotPasswordToken from "../../utils/formatForgotPasswordToken";

interface PasswordRequest {
    newPassword: string;
    key: string;
}

export default function createPatchPassword({app, dbConn, redis}: Context) {
    app.patch(API_PATH + "/password", async (req, res) => {
        const {newPassword, key}: PasswordRequest = req.body;

        if (!newPassword || !key) {
            res.send({error: "Requisição deve ser no formato: {newPassword: string, key: string}"})
            return;
        }

        // Check if the key is valid
        const cachedUserId = await redis.get(formatForgotPasswordToken(key));
        if (!cachedUserId) {
            res.send({error: "Chave inválida ou já utilizada", source: "key"})
            return;
        }

        const userId = parseInt(cachedUserId);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = (await dbConn.manager.query(`update "user" set password = $1 where id = $2 returning id, username, role;`, [hashedPassword, userId]))[0][0]
        
        res.send(user);
    })
}