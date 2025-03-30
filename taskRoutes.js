const router = require("express").Router();
const taskController = require("./taskController");
router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

router.post("/:id/comments", taskController.addComment);
router.delete("/:taskId/comments/:commentId", taskController.deleteComment);
module.exports = router;