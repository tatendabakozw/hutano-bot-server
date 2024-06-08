require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./config/mongo");

const express = require("express");
const app = express();
const cors = require("cors");

connectDB();

const PORT = process.env.PORT || 7000;

app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

app.get("/", async (req, res) => {
  //   const { query } = req.query;
  try {
    // const result = await runSample(query);
    return res.status(200).json({ message: "Server for POS" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

app.use("/auth", require("./routes/auth/login"));
app.use("/auth", require("./routes/auth/register"));

//not found handler
app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

//error handling middleware
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  console.log(error);
  res.send({
    message: error.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "only viewable in development"
        : error.stack,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server up in port ${PORT}`);
});
