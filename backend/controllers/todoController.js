const { Todo: TodoModel } = require("../models/Todo");

const todoController = {
  create: async (req, res) => {
    try {
      const todo = {
        text: req.body.text,
        category: req.body.category,
        isCompleted: req.body.isCompleted,
      };

      const response = await TodoModel.create(todo);

      res.status(201).json({ response, msg: "Tarefa criada com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const todos = await TodoModel.find();
      res.json(todos);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await TodoModel.findById(id);

      if (!todo) {
        res.status(404).json({ msg: "Tarefa não encontrada" });
        return;
      }
      res.json(todo);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await TodoModel.findById(id);

      if (!todo) {
        res.status(404).json({ msg: "Tarefa não encontrada!" });
        return;
      }

      const deletedTodo = await TodoModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deletedTodo, msg: "Tarefa excluída com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      const todo = {
        text: req.body.text,
        category: req.body.category,
        isCompleted: req.body.isCompleted,
      };

      const updatedTodo = await TodoModel.findByIdAndUpdate(id, todo);

      if (!updatedTodo) {
        res.status(404).json({ msg: "Trefa não encontrada" })
        return;
      }

      res.status(200).json({todo, msg: "Tarefa atualizada com sucesso!"})
    } catch (error) {
      console.log(error)
    }
  }
};

module.exports = todoController;
