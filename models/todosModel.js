const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
  userId: String,
  todos: [
    {
      checked: Boolean,
      text: String,
    },
  ],
})

const Todos = mongoose.model("Todo", todoSchema)

module.exports = Todos
