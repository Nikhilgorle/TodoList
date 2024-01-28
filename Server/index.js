const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/Todo");
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI
);

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const existingTodo = await TodoModel.findById(id);

    if (!existingTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      { _id: id },
      { done: !existingTodo.done },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res.json(err);
  }
});


app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", async (req, res) => {
  try {
    const task = req.body.task;
    if (task === "") {
      return res.status(400).json({ error: "Task cannot be empty" });
    }

    const result = await TodoModel.create({
      task: task,
    });

    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

app.listen(5000, () => {
  console.log("server is running");
});
