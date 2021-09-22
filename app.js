const express = require("express");
const path = require("path");
const app = express();
const User = require("./js/Model");
const sequelize = require("./database/database");

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

//if data is submitted we are giving post method then
app.post("/signUp", function (req, res) {
  apiResponse = req.body;
  console.log(apiResponse);
  let records = [];
  if (apiResponse.psw == apiResponse.pswRepeat) {
    records.push({
      Email: apiResponse.email,
      Name: apiResponse.name,
      Password: apiResponse.psw,
      Gender: apiResponse.gender,
    });
    User.create({
      Email: apiResponse.email,
      Name: apiResponse.name,
      Password: apiResponse.psw,
      Gender: apiResponse.gender,
    });
    console.log("Records Updated!!");
    res.send("account created");
  } else {
    res.send("Password don't match");
    res.sendFile(path.join(__dirname, "/template/main.html"));;
  }
})

// /postQuestion
createUserTable();
createQuestionTable();

// Table creation in db if table does not exists.
async function createUserTable() {
  await sequelize
    .sync()
    .then(console.log("Hello"))
    .catch((err) => console.log(err));
}

async function createQuestionTable() {
  await sequelize
    .sync()
    .then(console.log("Hello"))
    .catch((err) => console.log(err));
}