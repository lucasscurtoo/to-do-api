const lists = require("express").Router();
const createNewList = require("../controllers/list/createList");
const deleteList = require("../controllers/list/deleteList");
const getUserLists = require("../controllers/list/getLists");
const updateList = require("../controllers/list/updateList");

lists.post("/createList", async (req, res) => {
  createNewList(req, res);
});

lists.get("/getUserLists", async (req, res) => {
  getUserLists(req, res);
});

lists.delete("/deleteList", async (req, res) => {
  deleteList(req, res);
});

lists.put("/updateList", async (req, res) => {
  updateList(req, res);
});
module.exports = lists;
