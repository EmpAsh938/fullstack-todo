const { asyncMiddleware } = require("middleware-async");

const Subtask = require("../model/subtaskModel");
const Task = require("../model/taskModel");
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
        const result = await getFilteredTask(filterby, Subtask);
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


const getAllSubtask = asyncMiddleware(async (req, res) => {
    const { id } = req.query;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "Id parameter is missing or empty",
            body: []
        })
    }

    if(!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: "Id parameter is not valid ObjectId",
            body: []
        })
    }
    try {
        let tasks = await Subtask.find({parent_id: {$eq: id}});
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

const getOneSubtask = asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "Id parameter is missing or empty",
            body: []
        })
    }
    
    if(!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: "Id parameter is not valid ObjectId",
            body: []
        })
    }
    try {
        let subtask = await Subtask.findById(mongoose.Types.ObjectId(id));
        if(subtask) {
            return res.status(200).json({
                success: true,
                message: "Subtask has been successfully retrieved",
                body: []
            })
        }
        return res.json({
            success: false,
            message: `Subtask with ${id} could not be found`,
            body: []
        }) 
    } catch (error) {
        throw Error(error);
    }
   
})

const createSubtask = asyncMiddleware(async (req, res) => {
    const { id, title, icon, link, isCompleted } = req.body;
    if(!id || !title || !icon) {
        return res.status(400).json({
            success: false,
            message: "Id or Title or Icon or isCompleted parameter is missing or empty",
            body: []
        })
    }
    if(!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: "Id parameter is not valid ObjectId",
            body: []
        })
    }
    try {
        let isValidParentId = await Task.findById(id);
        if(!isValidParentId) {
            return res.status(400).json({
            success: false,
            message: "Id parameter does not exist",
            body: []
        })
        }
        let subtask = await Subtask.create({title,icon,link,isCompleted,parent_id:id});
        if(subtask) {
            return res.status(201).json({
                success: true,
                message: "Subtask has been Created",
                body: subtask
            })
        }
        return res.json({
            success: false,
            message: `Subtask cannot be created`,
            body: []
        }) 
    } catch (error) {
        throw Error(error);
    }
   
})

const editSubtask = asyncMiddleware(async (req, res) => {
    const { title, id, icon, link, isCompleted } = req.body;
    if(!id || !title || !icon || !isCompleted) {
        return res.status(400).json({
            success: false,
            message: "Id or Title or Icon or isCompleted parameter is missing or empty",
            body: []
        })
    }
    if(!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: "Id parameter is not valid ObjectId",
            body: []
        })
    }
    try {
        let subtask = await Subtask.findByIdAndUpdate(id, {$set:{title,icon,link,isCompleted}});
        if(subtask) {
            return res.status(200).json({
                success: true,
                message: "Subtask has been edited",
                body: subtask
            })
        }
        return res.json({
            success: false,
            message: `Subtask with ${id} could not be edited`,
            body: []
        })
    } catch (error) {
        throw Error(error);
    }
    return res.status(200).json({
        success: true,
        message: "Subtask has been edited",
        body: []
    })
})

const deleteSubtask = asyncMiddleware(async (req, res) => {
    const { id } = req.body;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "Id parameter is missing or empty",
            body: []
        })
    }
    if(!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: "Id parameter is not valid ObjectId",
            body: []
        })
    }
    try {
        let subtask = await Subtask.findByIdAndRemove(id);
        if(subtask) {
            return res.status(200).json({
                success: true,
                message: "Subtask has been deleted",
                body: subtask
            })
        }
        return res.json({
            success: false,
            message: `Subtask with id ${id} could not be deleted`,
            body: []
        })
    } catch (error) {
        throw Error(error);
    }
    
})

module.exports = {
    createSubtask,
    editSubtask,
    deleteSubtask,
    getOneSubtask,
    getAllSubtask,
    getNumberOfTask
}