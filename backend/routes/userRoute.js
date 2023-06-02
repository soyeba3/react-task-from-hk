const express = require("express");
const { allUsers, addUser } = require("../controllers/user");

const router = express.Router();

//Get all user
router.get("/allUsers", allUsers);

router.post("/add_user", addUser);

module.exports = router;
