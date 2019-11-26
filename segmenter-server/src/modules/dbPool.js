// import library
const mysql = require("mysql2/promise");
require("dotenv").config();

// MySQL create pool
const dbPool = {
  pool: mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    connectionLimit: 20,
    waitForConnections: true
  })
};

module.exports = dbPool;
