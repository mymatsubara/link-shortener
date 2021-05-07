import handleLinkRequest from "../../utils/handleLinkRequest";
import { Link } from "../../entities/Link";
import Context from "../../interfaces/Context";
import { API_PATH } from "../../consts";

export default function createPostUpdate({ app, dbConn, redis }: Context) {
  app.post(API_PATH + "/update", async (req, res) => {
    handleLinkRequest(
      redis,
      dbConn,
      req,
      res,
      async (_, { basePath, redirectTo }) => {
        const result = await dbConn
          .createQueryBuilder()
          .update(Link)
          .set({ redirectTo })
          .where(`"basePath" = :basePath`, { basePath })
          .execute();
        return result.affected
          ? { success: "Caminho atualizado com sucesso" }
          : { error: "Erro ao atualizar o caminho", source: "basePath" };
      }
    );
  });
}
