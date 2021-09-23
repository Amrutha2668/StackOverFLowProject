const express = require("express");
const path = require("path");
const app = express();
const User = require("./Models/UserModel");
const QuestionModel = require("./Models/QuestionModel");
const AnswersModel = require("./Models/AnswerModel");
const sequelize = require("./database/database");
const { Op } = require("sequelize");

// Fetching and rendering the data
app.use("/static", express.static("static"));

app.listen(3007, function () {
  console.log("server has started");
});

//middleware functions execute during lifecycle of a request to the express server  EG:USE
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});

// SignUp part
app.get("/signUp", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/signUp.html"));
});

// Variables used to fetch the data.
let email;
let questionId;

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
      if (apiResponse.psw == apiResponse.pswRepeat) {
        User.create({
          Email: apiResponse.email,
          Name: apiResponse.name,
          Password: apiResponse.psw,
          Gender: apiResponse.gender,
        });
        console.log("Records Updated!!");
        res.sendFile(path.join(__dirname, "./templates/login.html"));
      } else {
        // res.send("Password don't match");
        res.sendFile(path.join(__dirname, "./templates/signUp.html"));
      }
    } else {
      // res.send("You're already registered!! Please login");
      res.sendFile(path.join(__dirname, "./templates/login.html"));
    }
  }
});

// Login part
app.get("/login", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/login.html"));
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
    if (count2 == 1) {
      res.sendFile(path.join(__dirname, "./templates/main.html"));
      // res.send("hey user successfully logged in");
    }
    // If not redirect them to login page again!
    else {
      res.sendFile(path.join(__dirname, "./templates/login.html"));
    }
  }
});

// Question part
app.get("/postQuestion", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/question.html"));
});

app.post("/postQuestion", function (req, res) {
  apiResponse = req.body;
  const postedQuestion = apiResponse.T2;
  console.log(apiResponse);
  QuestionModel.create({
    Title: apiResponse.T1,
    Question: apiResponse.T2,
    Email: email,
  });
  console.log("Question Updated!!");
  // res.send(postedQuestion);
  // Need to send the posted question to the main.html
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});

// 1. Need to implement html part---> Answer part
app.get("/postAnswers", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});

app.post("/postAnswers", function (req, res) {
  apiResponse = req.body;
  const postedAnswer = apiResponse.answer;
  console.log(apiResponse);
  QuestionModel.create({
    QuestionId: questionId,
    Answer: apiResponse.answer,
    Email: email,
  });
  console.log("Answer Posted!!");
  // res.send(postedAnswer);
  // Need to send posted answer to the main.html
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});

// about part
app.get("/about", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/about.html"));
});

// search part
app.get("/search", (req, res) => {
  //sending a whole html file to browser
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});

app.post("/search", function (req, res) {
  apiResponse = req.body;
  console.log(apiResponse);
  const searchString = apiResponse.search;
  console.log(apiResponse.search);
  data();

  // Fetching the searched Question
  function fetchQuestion() {
    const result = QuestionModel.findAll({
      attributes: ["id", "Question"],
      where: {
        ["Question"]: {
          [Op.like]: `%${searchString}%`,
        },
      },
    });
    return result;
  }

  // Fetching the answers for the searched question
  function fetchAnswer(questionId) {
    const result = AnswersModel.findAll({
      attributes: ["id", "Answer"],
      where: {
        ["id"]: [questionId],
      },
    });
    return result;
  }

  // 2. need to Implement ----> must to send data and data1 to browser(HomePage)
  async function data() {
    const fetchedQuestion = await fetchQuestion();
    // doubt 1
    console.log(fetchedQuestion);
    // questionId = fetchedQuestion['id'];
    data1(questionId);

    async function data1(questionId) {
      const fetchedAnswer = await fetchAnswer(questionId);
      console.log(fetchedAnswer);
    }
    console.log(fetchedAnswer);
    // res.send("Question Posted");
    res.sendFile(path.join(__dirname, "./templates/main.html"));
  }
});

createTable();

// Table creation in db if table does not exists.
async function createTable() {
  await sequelize
    .sync()
    .then(console.log("Hello"))
    .catch((err) => console.log(err));
}
