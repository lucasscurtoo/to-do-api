const tasks = require("express").Router();
const createTask = require("../controllers/task/createTask");
const deleteTask = require("../controllers/task/deleteTask");
const updateTask = require("../controllers/task/updateTask");
const completeOrDecompleteTask = require("../controllers/task/completeOrDecompleteTask");

tasks.post("/createTask", async (req, res) => {
  createTask(req, res);
});

tasks.put("/updateTask", async (req, res) => {
  updateTask(req, res);
});

tasks.delete("/deleteTask", async (req, res) => {
  deleteTask(req, res);
});

tasks.put("/completeOrDecompleteTask", async (req, res) => {
  completeOrDecompleteTask(req, res);
});

module.exports = tasks;
