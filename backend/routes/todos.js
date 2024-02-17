const router = require("express").Router();

const todoController = require("../controllers/todoController");

router.route("/todos")
    .post((req, res) => todoController.create(req, res));

router.route("/todos")
    .get((req, res) => todoController.getAll(req, res));

router.route("/todo/:id")
    .get((req, res) => todoController.get(req, res));

router.route("/todo/:id")
    .delete((req, res) => todoController.delete(req, res));

router.route("/todo/:id")
    .put((req, res) => todoController.update(req, res));
    
module.exports = router;
