import { CookieOptions } from "express";

// Time to expire session in seconds
export const SESSION_EXPIRE = 3600 * 24 * 30 * 1000;  // 30 dias

// If in production -> true
export const __prod__ = process.env.NODE_ENV === "production"

export const SESSION_COOKIE_NAME = "SESSION_ID";

export const SESSION_COOKIE_CONFIG: CookieOptions = {
    maxAge: SESSION_EXPIRE,
    sameSite: "lax",
    httpOnly: true,
    secure: __prod__
};

export const API_PATH = "/api";

// Mail info
export const MAIL_ADDRESS = process.env.MAIL_ADDRESS;
export const MAIL_SMTP = process.env.MAIL_SMTP;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

export const FRONTEND_URL = "http://localhost:4000"

export const INVITE_EXPIRE = 3600 * 24 * 7 * 1000;  // 7 dias