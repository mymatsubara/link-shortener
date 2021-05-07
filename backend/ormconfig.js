const { ModuleResolutionKind } = require("typescript")

module.exports = {
    "type": "postgres",
    "host": process.env.NODE_ENV === "production" ? process.env.DB_HOST : "localhost",
    "port": process.env.DB_PORT || 5432,
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "heysoulsister",
    "synchronize": true,
    "entities": ["./dist/entities/*.js"],
    "migrations": ["./dist/migrations/*"]
}