const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserSchema = require("./models/User");

require("dotenv").config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Test route
app.get("/", (req, res) => {
  res.json({ message: "User Manager API Running" });
});

// create user
app.post("/user", async (req, res) => {
  const data = UserSchema(req.body);

  await data.save();

  res.json({ message: "Data Saved" });
});

//getUser

app.get("/user", async (req, res) => {
  const data = await UserSchema.find();

  res.json({ data });
});

//update

app.put("/user/:id", async (req, res) => {
  const updatedUser = await UserSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  updatedUser.completed = !updatedUser.completed;
  res.json(updatedUser);
  await updatedUser.save();
  res.json({ data });
});

///////
// get user by id
app.get("/user/:id", async (req, res) => {
  ////////

  const user = await UserSchema.findById(req.params.id);

  res.json({ user });
});

//delete user

app.delete("/user/:id", async (req, res) => {
  const user = await UserSchema.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted!" });
});

/////
// app.listen(5000, () => {
//   console.log(`Server running on port ${5000}`);
// });

//DB connect

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server run on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
