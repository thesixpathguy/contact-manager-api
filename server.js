require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConn");
const { default: mongoose } = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3500;

connectDB();

app.use(express.json());

app.use("/api/contact", require("./routes/api/contact"));
app.use("/api/user", require("./routes/api/user"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`Server running on port number: ${PORT}`);
  });
});
