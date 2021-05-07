import Context from "../interfaces/Context";
import { Link } from "../entities/Link";

export default async function createGetOthers({app, dbConn}: Context) {
    app.get("/*", async (req, res) => {
        const link = await dbConn.manager.findOne(Link, { basePath: req.url.substring(1) })
        if (link) {
            res.redirect(link.redirectTo)
        }
        else {
            res.sendStatus(404);
        }
    })
}