const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const connectDB = require("./config/db.js")
const todoRouter = require("./routes/todoRoutes.js")
const userRouter = require("./routes/userRoutes.js")
const dotenv = require("dotenv")
const path = require("path")

connectDB()
mongoose.set("useFindAndModify", false)
dotenv.config()

app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use("/todo", todoRouter)

app.use(express.static(path.join(__dirname, "client/build")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log("listening to port 4000")
})

const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  // we're connected!
})
