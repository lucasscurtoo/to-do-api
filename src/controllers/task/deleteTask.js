const Joi = require("@hapi/joi");
const List = require("../../models/list");

const taskSchema = Joi.object({
  title: Joi.string().required(),
  completed: Joi.boolean().required(),
  description: Joi.string().required(),
  username: Joi.string().required(),
});

const deleteTask = async (req, res) => {
  const { completed, description, username, title } = req.body;

  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const lists = await List.findOne({ title: title, username: username });
  if (!lists)
    return res
      .status(404)
      .json({ error: true, message: "List doesnt exists", status: 404 });

  const taskExists = lists.todo.some(
    (elem) => elem.description === description
  );
  if (!taskExists)
    return res
      .status(404)
      .json({
        error: true,
        message: `Task ${description} doesnt exists`,
        status: 404,
      });

  try {
    await List.updateOne(
      {
        "todo.description": description,
      },
      { $pull: { todo: { completed: completed, description: description } } }
    );

    res.json({
      status: 200,
      message: "Task succesfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      error,
      message: "Cant delete that task",
    });
  }
};

module.exports = deleteTask;
