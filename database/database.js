// eslint-disable-next-line no-undef
const { Sequelize } = require("sequelize");

// Access to Mysql server
let sequelize = new Sequelize("", "root", "varSHA_96", {
  dialect: "mysql",
});

// Database creation
sequelize
  .query("CREATE DATABASE IF NOT EXISTS `StackOverFlow`;")
  .then(() => console.log("Created Database"));

// Establishing connection with created db
sequelize = new Sequelize("StackOverFlow", "root", "varSHA_96", {
  host: "localhost",
  dialect: "mysql",
});

// eslint-disable-next-line no-undef
module.exports = sequelize;
