const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbDialect: process.env.DB_DIALECT,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbPassword: process.env.DB_PASSWORD
}

