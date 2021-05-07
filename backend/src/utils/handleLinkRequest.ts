import { Redis } from "ioredis";
import { Connection } from "typeorm";
import getUserId from "./getUserId";
import { Request, Response } from "express";
import formatLink from "./formatLink";
import isLinkValid from "./isLinkValid";
import isPathValid from "./isPathValid";
import { Link } from "../entities/Link";

export default async function handleLinkRequest(
  redis: Redis,
  dbConn: Connection,
  req: Request,
  res: Response,
  dbAction: (
    dbConn: Connection,
    link: Omit<Link, "user" | "id" | "search"> & { user: { id: number } }
  ) => Promise<any>
) {
  const userId = await getUserId(req, redis);

  if (userId === undefined) {
    res.send({ error: "Usuário não autenticado" });
    return;
  }

  try {
    let { basePath, redirectTo } = req.body;
    redirectTo = formatLink(redirectTo);

    if (!isLinkValid(redirectTo)) {
      res.send({ error: "Link inválido", source: "redirectTo" });
      return;
    }

    if (!isPathValid(basePath)) {
      res.send({ error: "Caminho inválido", source: "basePath" });
      return;
    }

    const link = await dbAction(dbConn, {
      basePath,
      redirectTo,
      user: { id: userId },
    });
    res.send(link);
  } catch (e) {
    if (e.code == "23505") {
      res.send({ error: "Caminho já está em uso", source: "basePath", updateAvailable: true });
    } else {
      console.log(e);
      res.send({error: "Erro inesperado", source: "basePath"})
    }
  }
}
