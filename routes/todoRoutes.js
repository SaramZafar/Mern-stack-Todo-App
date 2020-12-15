const express = require("express")
const router = express.Router()
const User = require("../models/usersModel.js")
const Todos = require("../models/todosModel.js")

router.post("/addTodos", async (req, res) => {
  const { authorization } = req.headers
  const [, token] = authorization.split(" ")
  const [username, password] = token.split(":")
  const todosItems = req.body

  const user = await User.findOne({ username }).exec()

  if (!user || user.password != password) {
    res.status(403).json({
      message: "Invalid access",
    })
    return
  }

  let foundTodos = await Todos.findOne({ userId: user._id }).exec()

  if (!foundTodos) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    })
  } else {
    foundTodos.todos = todosItems
    await foundTodos.save()
  }
  const { todos } = await Todos.findOne({ userId: user._id }).exec()
  res.json(todos)
})

router.get("/getTodos", async (req, res) => {
  const { authorization } = req.headers
  const [, token] = authorization.split(" ")
  const [username, password] = token.split(":")
  const user = await User.findOne({ username }).exec()
  if (!user || user.password != password) {
    res.status(403).json({
      message: "Invalid access",
    })
    return
  }

  try {
    const { todos } = await Todos.findOne({ userId: user._id }).exec()
    if (todos) {
      res.json(todos)
    } else {
      return
    }
  } catch (error) {
    return
  }
})
router.patch("/updateTodos", async (req, res) => {
  const { authorization } = req.headers
  const [, token] = authorization.split(" ")
  const [username, password] = token.split(":")
  const user = await User.findOne({ username }).exec()
  if (!user || user.password != password) {
    res.status(403).json({
      message: "Invalid access",
    })
    return
  }
  const { id, text } = req.body

  await Todos.updateOne(
    { "todos._id": id },
    { $set: { "todos.$.text": text } }
  ).exec()

  res.json({ message: "success" })
})

router.delete("/deleteTodo", async (req, res) => {
  const { authorization } = req.headers
  const [, token] = authorization.split(" ")
  const [username, password] = token.split(":")
  const user = await User.findOne({ username }).exec()
  if (!user || user.password != password) {
    res.status(403).json({
      message: "Invalid access",
    })
    return
  }
  const { id } = req.body
  await Todos.updateOne(
    { "todos._id": id },
    { $pull: { todos: { _id: id } } }
  ).exec()
  const { todos } = await Todos.findOne({ userId: user._id }).exec()
  res.json(todos)
})
module.exports = router
