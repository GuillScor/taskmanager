const Task = require("./taskModel");
exports.getTasks = async (req, res) => { res.json(await Task.find()); };
exports.createTask = async (req, res) => { res.json(await new Task(req.body).save()); };
exports.updateTask = async (req, res) => { res.json(await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })); };
exports.deleteTask = async (req, res) => { res.json(await Task.findByIdAndDelete(req.params.id)); };
