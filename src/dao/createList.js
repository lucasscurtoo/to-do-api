const List = require("../models/list");

const createList = (title, username) => {
  if (!title) {
    const list = new List({
      title: "My List",
      todo: [],
      username: username,
    });
    list.save();
  } else {
    const list = new List({
      title: title,
      todo: [],
      username: username,
    });
    list.save();
  }
};

module.exports = createList;
