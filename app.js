const express = require("express");
const path = require("path");
const app = express();

app.use("/static",express.static('static'))

app.listen(3007, function () {
  console.log("server has started");
});

//middleware functions execute during lifecycle of a request to the express server  EG:USE
app.use(express.urlencoded({ extended: true }));

app.get("/signup", (req, res) => {
  //sending a whole html file here
  res.sendFile(path.join(__dirname, "main.html"));
});

//if data is submitted we are giving post method then
app.post("/signup", function (req, res) {
  apiResponse = req.body;
  console.log(apiResponse);
  console.log(apiResponse.first);
  console.log(apiResponse.second);
  res.send("account created");
});
