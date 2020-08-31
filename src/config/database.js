require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.DATABASEURL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
mongoose.connection.once("open", () => console.log("DB connected"));

module.exports = mongoose;
