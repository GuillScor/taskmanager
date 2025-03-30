const router = require("express").Router();
const taskController = require("./taskController");
router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
module.exports = router;