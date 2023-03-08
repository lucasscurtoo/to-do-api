const Joi = require("@hapi/joi");
const List = require("../../models/list");

const taskSchema = Joi.object({
  title: Joi.string().required(),
  completed: Joi.boolean().required(),
  description: Joi.string().required(),
  newDescription: Joi.string().required(),
  username: Joi.string().required(),
});

const updateTask = async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const list = await List.findOne({
    title: req.body.title,
    username: req.body.username,
  });
  if (!list)
    return res
      .status(404)
      .json({ error: true, message: "List doesnt exists", status: 404 });

  const taskExists = list.todo.some(
    (elem) => elem.description === req.body.description
  );
  if (!taskExists)
    return res
      .status(404)
      .json({
        error: true,
        message: `Task ${req.body.description} doesnt exists`,
        status: 404,
      });

  const sameTask = list.todo.some(
    (elem) => elem.description === req.body.newDescription
  );
  if (sameTask)
    return res
      .status(400)
      .json({
        error: true,
        message: `Task ${req.body.description} already exists`,
        status: 400,
      });

  try {
    await List.findOneAndUpdate(
      {
        "todo.description": req.body.description,
      },
      {
        $set: {
          "todo.$.description": req.body.newDescription,
        },
      }
    );

    res.json({
      status: 200,
      message: "Task succesfully updated",
    });
  } catch (error) {
    res.status(400).json({
      error,
      message: "Cant update that task",
    });
  }
};

module.exports = updateTask;
