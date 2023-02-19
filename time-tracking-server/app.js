const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");
const adminRouter = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 8080;

require("./database/connection");

app.use(
  cors(
    "https://www.yoursite.com", // Whenever we deploy add the site URl
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:3001"
  )
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/task", taskRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
