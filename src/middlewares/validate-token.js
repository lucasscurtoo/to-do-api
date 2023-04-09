const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token")
  if (!token)
    return res.status(401).json({ error: true, message: "Access denied" })
  try {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithms: ["HS256"],
    })

    if (req.body.username !== verify.username) {
      return res.status(401).json({ error: true, message: "Unauthorized user" })
    }

    if (Date.now() >= verify.exp * 1000) {
      return res.status(401).json({ error: true, message: "Token has expired" })
    }

    req.user = verify
    next()
  } catch (error) {
    res.status(401).json({ error: true, message: "Token is not valid" })
  }
}

module.exports = verifyToken
