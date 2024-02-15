const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");

dotenv.config();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const my_routes = require("./src/routes");

app.use("/", my_routes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("waveFrnd App Database is connected successfully");
  })
  .catch((err) => {
    console.log("Error while connecting to database", err);
  });
// app.get("/", (res, req) => res.setEncoding("Hello World!"));
app.listen(process.env.PORT, () => {
  console.log(`waveFrnd App backend server running at ${process.env.PORT}`);
});
