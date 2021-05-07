import { Link } from "../../entities/Link";
import { API_PATH } from "../../consts";
import Context from "../../interfaces/Context";
import getUserId from "../../utils/getUserId";

interface PathsRequest {
  cursor?: number;
  pagesToSkip: number;
  pageSize: number;
  query?: string;
  count?: boolean;
}

export function createGetPaths({ app, dbConn }: Context) {
  app.get(API_PATH + "/paths", async (req, res) => {    
    let { cursor, pagesToSkip, pageSize, query, count }: PathsRequest = req.query as any;
    console.log(req.query);

    pageSize = !pageSize ? 10 : pageSize;

    const qb = dbConn
      .createQueryBuilder()
      .select(["id", `"basePath"`, `"redirectTo"`])
      .from(Link, "link")
      .orderBy("id", "DESC")
      .limit(pageSize);

    if (cursor) {
      qb.where("id < :id", { id: cursor });
    }
    if (pagesToSkip) {
      qb.offset(pagesToSkip * pageSize);
    }
    if (query) {
      if (cursor) {
        qb.andWhere(`("basePath" ILIKE :query OR "redirectTo" ILIKE :query)`, {query: `%${query}%`});
      } else {
        qb.where(`"basePath" ILIKE :query OR "redirectTo" ILIKE :query`, {query: `%${query}%`});
      }
    }

    const linksPromisse = qb.execute();
    
    if (count) {
      const countQb = dbConn
      .createQueryBuilder()
      .select(["count(id)"])
      .from(Link, "link");
      
      if (query) {
        countQb.where(`"basePath" ILIKE :query OR "redirectTo" ILIKE :query`, {query: `%${query}%`});
      }
      
      const countPromisse = countQb.execute();
      res.send({ links: await linksPromisse, count: (await countPromisse)[0].count})   
      return;
    }

    res.send({ links: await linksPromisse });
  });
}

export function createDeletePath({app, dbConn, redis}: Context) {
  app.delete(API_PATH + "/path", async (req, res) => {
    if (!(await getUserId(req, redis))) {
      res.status(401).send({"error": "You're not authenticated"})
      return;
    }

    const {id} = req.body;
    if (!id) {
      res.send({"error": "Id not found on the http body"});
      return;
    }

    const result = await dbConn.manager.delete(Link, {id})

    if (result.affected) {
      res.send({"success": "Link was deleted"})
    } else {
      res.send({"error": "Nothing was deleted. Probably the id inserted is not right."})
    }
  });
}
