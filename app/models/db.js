require('dotenv').config();
const mysql = require("mysql");
// Create a connection to the database
const connection = mysql.createConnection({
  connectionLimit: process.env.CONNECTION_LIMIT,    // the number of connections node.js will hold open to our database
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});
// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
module.exports = connection;