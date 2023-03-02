const { asyncMiddleware } = require("middleware-async");

const Task = require("../model/taskModel");
const Subtask = require("../model/subtaskModel");
const isValidId = require("../utils/isValidId");
const getFilteredTask = require("../utils/getNumberofTask");

const getNumberOfTask = asyncMiddleware(async (req, res) => {
    const { filterby } = req.query;
    if(!filterby) {
        return res.status(400).json({
            success: false,
            message: "filterby parameter is missing or empty",
            body: []
        })
    }
    try {
        const result = await getFilteredTask(filterby, Task);
        if(result) {
            return res.json({
                success: true,
                message: "successfully retrieved",
                body: result
            })
        }
    } catch(error) {
        throw Error(error);
    }

})


const getAllTask = asyncMiddleware(async (req, res) => {
    try {
        let tasks = await Task.find({});
        if(tasks) {
            return res.status(200).json({
                success: true,
                message: "Tasks have been successfully retrieved",
                body: tasks
            })
        }
        return res.json({
            success: false,
            message: `Tasks could not be found`,
            body: []
        }) 
    } catch (error) {
        throw Error(error);
    }
})

const getOneTask = asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "Id parameter is missing or empty",
            body: []
        })
    }
    if(!isValidId(id)) {
        return res.json({
            success: false,
            message: `Id is not a valid ObjectId`,
            body: []
        }) 
    }
    try {
        let task = await Task.findById(id).populate("subtask");
        if(task) {
            return res.status(200).json({
                success: true,
                message: "Task has been successfully retrieved",
                body: task
            })
        }
        return res.json({
            success: false,
            message: `Task with ${id} could not be found`,
            body: []
        }) 
    } catch (error) {
        throw Error(error);
    }
})



const createTask = asyncMiddleware(async (req, res) => {
    const { title } = req.body;
    if(!title) {
        return res.status(400).json({
            success: false,
            message: "Title parameter is missing or empty",
            body: []
        })
    }
    try {
        let task = await Task.create({title});
        if(task) {
            return res.status(201).json({
                success: true,
                message: "New task has been created",
                body: task
            })
        }
        return res.json({
            success: false,
            message: `Task cannot be created`,
            body: []
        }) 
    } catch (error) {
        throw Error(error);
    }
    

})

const editTask = asyncMiddleware(async (req, res) => {
    const { title, id } = req.body;
    if(!title || !id) {
        return res.status(400).json({
            success: false,
            message: "Title/id parameter is missing or empty",
            body: []
        })
    }
    if(!isValidId(id)) {
        return res.json({
            success: false,
            message: `Id is not a valid ObjectId`,
            body: []
        }) 
    }
    try {
        let task = await Task.findByIdAndUpdate(id, {$set:{title}});
        if(task) {
            return res.status(200).json({
                success: true,
                message: "Task has been edited",
                body: task
            })
        }
        return res.json({
            success: false,
            message: `Task with ${id} could not be edited`,
            body: []
        })
    } catch (error) {
        throw Error(error);
    }
})

const deleteTask = asyncMiddleware(async (req, res) => {
    const { id } = req.body;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "Id parameter is missing or empty",
            body: []
        })
    }
    if(!isValidId(id)) {
        return res.json({
            success: false,
            message: `Id is not a valid ObjectId`,
            body: []
        }) 
    }
    try {
        let task = await Task.findById(id);
        if(task) {
            // delete subtask inside of it
            if(task.subtask && task.subtask.length > 0) {
                for(const subtask of task.subtask) {
                    await Subtask.findByIdAndRemove(subtask);
                }
            }
            task = await Task.findByIdAndRemove(id);
            return res.status(200).json({
                success: true,
                message: "Task has been deleted",
                body: task
            })
        }
        return res.json({
            success: false,
            message: `Task with id ${id} could not be deleted`,
            body: []
        })
    } catch (error) {
        throw Error(error);
    }
})


module.exports = {
    createTask,
    getAllTask,
    getOneTask,
    editTask,
    deleteTask,
    getNumberOfTask
}
