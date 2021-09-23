const Sequelize = require("sequelize");
const sequelize = require("../database/database");


const Questions = sequelize.define("Questions", {
    Title : Sequelize.DataTypes.TEXT,
    Question : Sequelize.DataTypes.BLOB,
    Email : Sequelize.DataTypes.TEXT,
 });

 module.exports = Questions;