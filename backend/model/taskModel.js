const mongoose = require("mongoose");
const { Schema } = mongoose;

const Subtask = require("../model/subtaskModel");

const taskSchema = new Schema({
    title: {
        type: String,
        
    },
    date: {
        type: Date,
        default: Date.now
    },
    subtasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Subtask'
        }
    ]
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
