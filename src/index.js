require("dotenv").config();
// Libraries Initiation
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

// Settings
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
app.use(cors());
require("./config/database");
require("dotenv").config();

const MongoDBStore = require("connect-mongodb-session")(session);

const userRoutes = require("./routes/user");

const store = new MongoDBStore({
  uri:
  process.env.DATABASEURL,
  collection: "sessions"
});

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send({
    msg: "Success"
  });
});

app.listen(port, () => {
  console.log("Server is running!");
});
