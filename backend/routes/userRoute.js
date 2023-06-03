const express = require("express");
const { allUsers, addUser, updateUser } = require("../controllers/user");

const router = express.Router();

//Get all user
router.get("/allUsers", allUsers);

//Add User
router.post("/add_user", addUser);

//Edit User
router.put("/:id", updateUser);
module.exports = router;
