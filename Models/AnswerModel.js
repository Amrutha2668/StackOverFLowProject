const Sequelize = require("sequelize");
const sequelize = require("../database/database");


const Answers = sequelize.define("Answers", {
    Answers : Sequelize.DataTypes.BLOB,
    Email : Sequelize.DataTypes.TEXT,
 });

 module.exports = Answers;