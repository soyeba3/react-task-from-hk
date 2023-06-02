const User = require("../models/User");

//Get all users
const allUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
};

//Add new User
const addUser = async (req, res, next) => {
  const user = new User(req.body);
  console.log(user);
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  allUsers,
  addUser,
};
