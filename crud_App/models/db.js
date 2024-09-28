const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "smartant",
  database: "crud_App",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

module.exports = connection;
