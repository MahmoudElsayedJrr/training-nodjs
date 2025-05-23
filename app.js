require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const coursesRoutes = require("./routes/courses_routes");
const usersRoutes = require("./routes/users_routes");

const cors = require("cors");

const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors());
app.use(express.json());
app.use("/api", coursesRoutes);
app.use("/api/users", usersRoutes);
/* app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({message :"Route not found"});
}) */

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
