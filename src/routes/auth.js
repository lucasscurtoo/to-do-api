const auth = require("express").Router();
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");

auth.post("/register", async (req, res) => {
  register(req, res);
});

auth.post("/login", async (req, res) => {
  login(req, res);
});

module.exports = auth;
