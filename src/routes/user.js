const user = require("express").Router();
const getUserDarkMode = require("../controllers/users/getUserDarkMode");
const updateUserDarkMode = require("../controllers/users/updateUserDarkMode");

user.get("/getUserDarkMode", async (req, res) => {
  getUserDarkMode(req, res);
});

user.put("/updateUserDarkMode", async (req, res) => {
  updateUserDarkMode(req, res);
});

module.exports = user;
