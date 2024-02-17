const router = require("express").Router();

//ToDo router
const todoRouter = require("./todos");
router.use("/", todoRouter);

module.exports = router;
