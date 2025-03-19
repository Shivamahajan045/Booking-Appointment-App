// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "nodewithsql",
//   password: "Shivu@123",
// });

// module.exports = pool.promise();

//using sequelize orm
const Sequelize = require("sequelize");
const sequelize = new Sequelize("nodewithsql", "root", "Shivu@123", {
  dialect: "mysql", //specifies mysql as a database
  host: "localhost",
  logging: false,
});

module.exports = sequelize;
