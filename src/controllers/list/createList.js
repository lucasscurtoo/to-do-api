const Joi = require("@hapi/joi")
const createList = require("../../dao/createList")
const List = require("../../models/list")

const listSchema = Joi.object({
  title: Joi.string().required(),
  username: Joi.string().required(),
})

const createNewList = async (req, res) => {
  const { error } = listSchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const listExists = await List.findOne({
    title: req.body.title,
    user: { username: req.body.username },
  })
  if (listExists)
    return res
      .status(400)
      .json({ error: true, message: "List already exists", status: 400 })

  try {
    createList(req.body.title, req.body.username)

    res.json({
      status: 200,
      message: "List created",
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = createNewList
