const Sequelize = require("sequelize");
const sequelize = require("../database/database");


const Answers = sequelize.define("Answers", {
    QuestionId : Sequelize.DataTypes.CHAR(255),
    Answer : Sequelize.DataTypes.CHAR(255),
    Email : Sequelize.DataTypes.TEXT,
 });

 module.exports = Answers;