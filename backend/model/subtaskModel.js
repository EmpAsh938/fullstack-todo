const mongoose = require("mongoose");
const { Schema } = mongoose;

const Task = require("./taskModel");

const subtaskSchema = new Schema({
    isCompleted: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: [true, "Please add title"]   
    },
    icon: {
        type: String,
    },
    link: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    parent_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Task'
    },
    priority_order: {
        type: Number    }
});

const Subtask = mongoose.model("Subtask", subtaskSchema);

module.exports = Subtask;
