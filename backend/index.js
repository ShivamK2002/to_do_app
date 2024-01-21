const express = require("express");
const { updateTodo, createTodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());
app.post("/todo", (req, res) => {
  const payload = req.body;
  const parsedPayload = createTodo.safeParse(payload);
  if (!parsedPayload.success) {
    req.status(411).json({
      msg: "send valid inputs",
    });
  } else {
    todo.create({
      title: payload.title,
      description: payload.description,
      completed: payload.completed,
    });
    res.status(200).json({ msg: "saved todo" });
  }
});

app.get("/todo", async (req, res) => {
  try {
    const allTodos = await todo.find();
    res.status(200).json(allTodos);
  } catch {
    res.sendStatus(404);
  }
});

app.put("/completed", async (req, res) => {
  const payload = req.body;
  const parsedPayload = updateTodo.safeParse(payload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "send valid inputs",
    });
  } else {
    await todo.updateOne({ id: req.body.id }, { completed: true });

    res.status(200).json({
      msg: "marked as done",
    });
  }
});

app.listen(3000, (req, res) => console.log("To-DO..."));
