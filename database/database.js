<<<<<<< HEAD
// eslint-disable-next-line no-undef
const { Sequelize } = require("sequelize");

// Access to Mysql server
let sequelize = new Sequelize("", "root", "root@123", {
  dialect: "mysql",
});

// Database creation
sequelize
  .query("CREATE DATABASE IF NOT EXISTS `StackOverFlow`;")
  .then(() => console.log("Created Database"));

// Establishing connection with created db
sequelize = new Sequelize("StackOverFlow", "root", "root@123", {
  host: "localhost",
  dialect: "mysql",
});

// eslint-disable-next-line no-undef
module.exports = sequelize;
||||||| 72226bd
=======
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
>>>>>>> 646eb4ead6fec55961bb1912b18920346f4a2434
