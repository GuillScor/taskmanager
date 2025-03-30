const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./taskRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/tasks", taskRoutes);

mongoose.connect("mongodb://localhost:27017/taskmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur sur port ${PORT}`));