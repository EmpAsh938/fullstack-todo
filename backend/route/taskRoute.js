const express = require("express");
const { getAllTask,getNumberOfTask, getOneTask, createTask, editTask, deleteTask } = require("../controller/taskController");

const router = express.Router();

router.get('/count', getNumberOfTask)
router.get('/all',getAllTask);
router.get('/one/:id',getOneTask);
router.post('/new',createTask);
router.put('/update', editTask);
router.delete('/remove', deleteTask);
module.exports = router;
