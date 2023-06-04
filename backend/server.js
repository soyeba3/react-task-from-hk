const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/userRoute");

app.use(cors());

const connect = () => {
  try {
    mongoose.connect(
      `mongodb+srv://hk_project:x0TCQSkVfitcFOjj@cluster0.uwl9z.mongodb.net/hk_project?retryWrites=true&w=majority`
    );
  } catch (error) {
    throw error;
  }
};

app.use(express.json());
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(5000, (req, res) => {
  connect();
  console.log(`Server is listening on port 5000`);
});
