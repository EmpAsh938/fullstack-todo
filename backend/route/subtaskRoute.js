const express = require("express");
const { createSubtask, getNumberOfTask, deleteSubtask, editSubtask, getOneSubtask, getAllSubtask } = require("../controller/subtaskController");

const router = express.Router();

router.get('/count', getNumberOfTask)
router.get('/all', getAllSubtask);
router.get('/one/:id', getOneSubtask);
router.post('/new', createSubtask);
router.put('/update', editSubtask);
router.delete('/remove', deleteSubtask);

module.exports = router;
