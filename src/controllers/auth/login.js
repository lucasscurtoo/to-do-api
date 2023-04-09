const User = require("../../models/user")
const Joi = require("@hapi/joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const schemaLogin = Joi.object({
  username: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
})

const login = async (req, res) => {
  const { error } = schemaLogin.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const user = await User.findOne({ username: req.body.username })
  if (!user)
    return res.status(404).json({ error: true, message: "User not found" })

  const passValid = await bcrypt.compare(req.body.password, user.password)
  if (!passValid)
    return res.status(401).json({ error: true, message: "Incorrect password" })

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" }
  )

  res.header("auth-token", token).json({
    error: null,
    data: { token },
    status: 200,
  })
}

module.exports = login
