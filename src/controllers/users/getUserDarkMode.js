const User = require("../../models/user");

const getUserDarkMode = async (req, res) => {
  if (!req.query.username)
    return res
      .status(400)
      .json({ error: true, message: "Username dont send", status: 400 });

  const user = await User.findOne({ username: req.query.username });
  if (!user)
    return res
      .status(404)
      .json({ error: true, message: "User does'nt exist", status: 404 });

  res.json({
    status: 200,
    data: { darkmode: user.darkmode },
  });
};

module.exports = getUserDarkMode;
