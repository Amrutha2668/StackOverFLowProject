const Sequelize = require("sequelize");
const sequelize = require("../database/database");


const Questions = sequelize.define("Questions", {
    Title : Sequelize.DataTypes.TEXT,
    Question : Sequelize.DataTypes.CHAR(255),
    Email : Sequelize.DataTypes.TEXT,
 });

 module.exports = Questions;