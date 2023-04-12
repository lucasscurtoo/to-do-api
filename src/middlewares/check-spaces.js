const checkSpaces = (req, res, next) => {
  const { body } = req
  Object.keys(body).forEach((key) => {
    let value = body[key]
    if (typeof value === "string" && value.endsWith(" ")) {
      value = value.slice(0, -1)
      body[key] = value
    }
  })
  next()
}

module.exports = checkSpaces
