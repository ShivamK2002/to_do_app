const { model } = require("mongoose");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Shivam2024:Shivam%402024@cluster0.er8iil9.mongodb.net/todos"
);

const todo = mongoose.model("todos", {
  title: String,
  description: String,
  completed: Boolean,
});
module.exports = { todo };
