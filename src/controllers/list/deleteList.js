const Joi = require("@hapi/joi");
const List = require("../../models/list");

const listSchema = Joi.object({
  title: Joi.string().required(),
  username: Joi.string().required(),
});

const deleteList = async (req, res) => {
  const { error } = listSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const listExists = await List.findOne({
    title: req.body.title,
    username: req.body.username,
  });
  if (!listExists)
    return res
      .status(404)
      .json({ error: true, message: "List doesnt exists", status: 404 });

  try {
    await List.findOneAndDelete({
      title: req.body.title,
      username: req.body.username,
    });
    res.json({
      status: 200,
      message: "List deleted",
    });
  } catch (error) {
    res.status(400).json({
      error,
      message: "Cant delete list",
    });
  }
};

module.exports = deleteList;
