require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
    contentSecurityPolicy: false,
  })
);

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

const db = require("./models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.listen(3001, () => console.log("App listening on port 3000"));
