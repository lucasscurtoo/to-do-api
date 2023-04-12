const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const compression = require("compression")

dotenv.config()

const app = express()
const port = 8000

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`CONNECTED TO MONGO`)
  })
  .catch((err) => {
    console.log(`NOT CONNECTED TO MONGO`)
    console.log(err)
  })

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
  })
)

const auth = require("./src/routes/auth")
const validateToken = require("./src/middlewares/validate-token")
const checkSpaces = require("./src/middlewares/check-spaces")
const lists = require("./src/routes/lists")
const tasks = require("./src/routes/tasks")
const user = require("./src/routes/user")

app.use("/auth", checkSpaces, auth)
app.use("/lists", validateToken, lists)
app.use("/tasks", validateToken, tasks)
app.use("/users", validateToken, user)

app.listen(port, () => console.log("server running on port", port))
