const express = require("express")
const router = express.Router()
const User = require("../models/usersModel.js")

router.post("/register", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (user) {
    res.status(500).json({
      message: "User already exists",
    })
    return
  }

  await User.create({ username, password })

  res.json({
    message: "user added successfully",
  })
})
router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user || user.password != password) {
    res.status(403).json({
      message: "Autentication error",
    })
    return
  }

  res.json({
    message: "Login success",
  })
})

module.exports = router
