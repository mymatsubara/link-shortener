import Context from "../../interfaces/Context";
import { API_PATH, __prod__ } from "../../consts";
import { Link } from "../../entities/Link";
import handleLinkRequest from "../../utils/handleLinkRequest";

export default function createPostAdd({ app, dbConn, redis }: Context) {
  app.post(API_PATH + "/add", async (req, res) => {
    handleLinkRequest(
      redis,
      dbConn,
      req,
      res,
      async (_, { basePath, redirectTo, user }) => {
        return await dbConn.manager.save(Link, {
          basePath,
          redirectTo,
          user,
        });
      }
    );
  });
}
