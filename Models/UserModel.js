// eslint-disable-next-line no-undef
const Sequelize = require("sequelize");
const sequelize = require("../database/database");

// creating table
const User = sequelize.define("User", {
   Name : Sequelize.DataTypes.TEXT,
   Email : Sequelize.DataTypes.TEXT,
   Password : Sequelize.DataTypes.TEXT,
   Gender : Sequelize.DataTypes.TEXT,
});
// eslint-disable-next-line no-undef
module.exports = User;
