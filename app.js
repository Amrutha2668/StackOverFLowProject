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

// SignUp part
app.get("/signUp", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});

let email;

//if data is submitted we are giving post method then
app.post("/signUp", function (req, res) {
  apiResponse = req.body;
  // console.log(apiResponse);

  // Updating the db upon ensuring the uniqueness.
  checkUniqueness();

  // Check if the entered email is already present
  async function checkUniqueness() {
    const entryCount = await User.count({
      where: {
        Email: apiResponse.email,
      },
    });

    // If email is not present then update to table
    if (entryCount == 0) {
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

// Login part
app.get("/login", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});

app.post("/login", function (req, res) {
  apiResponse = req.body;
  console.log(apiResponse.psw);
  console.log(apiResponse.email);
  email = apiResponse.email;
  loginPage();

  // Check if email and password matches.
  async function loginPage() {
    count2 = await User.count({
      where: {
        [Op.and]: [
          { Email: { [Op.eq]: apiResponse.email } },
          { Password: { [Op.eq]: apiResponse.psw } },
        ],
      },
    });

    // if count is 1 then login successful
    if (count2 == 1) res.send("hey user successfully logged in");
    // If not redirect them to login page again!
    else {
      res.send("cannot login");
    }
  }
});

// Question part
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
