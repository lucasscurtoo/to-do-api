const Joi = require("@hapi/joi");
const List = require("../../models/list");

const listSchema = Joi.object({
  oldTitle: Joi.string().required(),
  newTitle: Joi.string().required(),
  username: Joi.string().required(),
});

const updateList = async (req, res) => {
  const { error } = listSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const list = await List.findOne({
    title: req.body.oldTitle,
    username: req.body.username,
  });
  if (!list)
    return res
      .status(404)
      .json({ error: true, message: "List doesnt exists", status: 404 });

  const newListExists = await List.findOne({
    title: req.body.newTitle,
    username: req.body.username,
  });

  if (newListExists)
    return res
      .status(404)
      .json({ error: true, message: "New list already exists", status: 404 });

  try {
    await List.findOneAndUpdate(
      { title: req.body.oldTitle, username: req.body.username },
      { title: req.body.newTitle }
    );
    res.json({
      status: 200,
      message: "Task succesfully updated",
    });
  } catch (error) {
    res.status(400).json({
      error,
      message: "Cant update that list",
    });
  }
};

module.exports = updateList;
