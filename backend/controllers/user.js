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
const addUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update User
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  allUsers,
  addUser,
  updateUser,
};
