import express from "express";
import { createConnection } from "typeorm";
import Context from "./interfaces/Context";
import Redis from "ioredis";
import cookieParser from "cookie-parser";
import { MAIL_ADDRESS, MAIL_PASSWORD, MAIL_SMTP, __prod__ } from "./consts";
import createPostLogin from "./endpoints/api/login";
import createGetOthers from "./endpoints/others";
import createGetMe from "./endpoints/api/me";
import createPostAdd from "./endpoints/api/add";
import createPostUpdate from "./endpoints/api/update";
import createDeleteLogout from "./endpoints/api/logout";
import createPostRegister from "./endpoints/api/register";
import { createGetPaths, createDeletePath } from "./endpoints/api/paths";
import nodemailer from "nodemailer";
import createPostInvite from "./endpoints/api/invite";
import createPatchPassword from "./endpoints/api/password";
import createPostForgotPassword from "./endpoints/api/forgotPassword";

async function main() {
  // Setting express
  const port = process.env.PORT || 8080;
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  // Setting db connection
  const dbConn = await createConnection();
  await dbConn.runMigrations();

  // Setting redis connection
  const redis = new Redis({
    host: __prod__ ? process.env.REDIS_HOST || "redis" : "localhost",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  });

  // Setting mail
  if (__prod__ && !process.env.MAIL_SMTP && !MAIL_ADDRESS && !MAIL_PASSWORD) {
    throw Error("You have to set up all mail variables (MAIL_SMTP, MAIL_ADDRESS and MAIL_PASSWORD)");
  }

  const mailTransporter = nodemailer.createTransport({
    host: MAIL_SMTP,
    port: 465,
    secure: true,
    auth: {
      user: MAIL_ADDRESS,
      pass: MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Creating endpoints
  const ctx: Context = { app, dbConn, redis, mailTransporter };

  // GET endpoints
  createGetMe(ctx);
  createGetPaths(ctx);

  // POST endpoints
  createPostLogin(ctx);
  createPostAdd(ctx);
  createPostUpdate(ctx);
  createPostRegister(ctx);
  createPostInvite(ctx);
  createPostForgotPassword(ctx);

  // DETELE endpoints
  createDeleteLogout(ctx);
  createDeletePath(ctx);

  // PATCH endpoints
  createPatchPassword(ctx);

  // Redirect endpoint
  createGetOthers(ctx);

  app.listen(port, () => {
    console.log(`Application is listening to http://localhost:${port}`);
  });
}

main().catch((e) => console.log(e));
