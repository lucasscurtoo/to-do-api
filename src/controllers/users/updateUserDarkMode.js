const Joi = require("@hapi/joi");
const User = require("../../models/user");

const userSchema = Joi.object({
  username: Joi.string().required(),
  darkmode: Joi.boolean().required(),
});

const updateUserDarkMode = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res
      .status(404)
      .json({ error: true, message: "User does'nt exist", status: 404 });

  try {
    await User.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        darkmode: req.body.darkmode,
      }
    );

    res.json({
      status: 200,
      message: "DarkMode updated",
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Cant update the user darkMode",
    });
  }
};

module.exports = updateUserDarkMode;
