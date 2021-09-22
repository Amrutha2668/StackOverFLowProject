const express = require("express");
const path = require("path");
const app = express();
const User = require("./js/Model");
const QuestionModel = require("./js/QuestionModel");
const sequelize = require("./database/database");
const { Op } = require("sequelize");

// Fetching and rendering the data
app.use("/static", express.static("static"));

app.listen(3007, function () {
  console.log("server has started");
});

//middleware functions execute during lifecycle of a request to the express server  EG:USE
app.use(express.urlencoded({ extended: true }));

app.get("/signUp", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});

let email;

//if data is submitted we are giving post method then
app.post("/signUp", function (req, res) {
  apiResponse = req.body;

  // just for checking purpose
  console.log(apiResponse);
  // Updating the db upon ensuring the uniqueness.
  checkUniqueness();

  async function checkUniqueness() {
    const count3 = await User.count({
      where: {
        Email : apiResponse.email,
      }
    });
    console.log(count3);
    // checking if passwords are same.
    if (count3 == 0) {
      User.create({
        Email: apiResponse.email,
        Name: apiResponse.name,
        Password: apiResponse.psw,
        Gender: apiResponse.gender,
      });
      console.log("Records Updated!!");
      res.send("account created");
    } else {
      res.send("You're already registered!! Please login");
      res.sendFile(path.join(__dirname, "/template/main.html"));
    }
  }
});

app.get("/login", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});
app.post("/login", function (req, res) {
  apiResponse = req.body;
  console.log(apiResponse.psw);
  console.log(apiResponse.email);
  loginPage();

  async function loginPage() {
    count2 = await User.count({
      where: {
        [Op.and]: [
          { Email: { [Op.eq]: apiResponse.email } },
          { Password: { [Op.eq]: apiResponse.psw } },
        ],
      },
    });
    console.log(count2);
    if (count2 == 1) res.send("hey user successfully logged in");
    else {
      res.send("cannot login");
    }
  }
});

app.get("/postQuestion", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});

app.post("/postQuestion", function (req, res) {
  apiResponse = req.body;
  console.log(apiResponse);
  QuestionModel.create({
    Title: apiResponse.T1,
    Question: apiResponse.T2,
    Email: email,
  });
  console.log("Question Updated!!");
  res.send("Question Posted");
});

createTable();

// Table creation in db if table does not exists.
async function createTable() {
  await sequelize
    .sync()
    .then(console.log("Hello"))
    .catch((err) => console.log(err));
}
