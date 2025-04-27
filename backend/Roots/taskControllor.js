import TaskModel from "../database/TaskSchema.js";
import errorHandler from "../database/dberrorHandling.js"
import lodash from 'lodash'


const create = async (req, res) => {
  console.log("Creating task")
  console.log(req.body)

  const task = new TaskModel(req.body);
  try {
    await task.save();
    res.status(200).json({
      message: "Task created successfully",
    
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
    try {
      let tasks = await TaskModel.find();
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ error: "No tasks found" });
      }
      console.log("Got tasks: ", tasks);
      res.json(tasks);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  }
  const taskByID = async (req, res, next, id) => {
    try {
      console.log("Getting task: "+id)
      let task = await TaskModel.findById(id)
      if (!task)
        return res.status('400').json({
          error: "task not found"
        })
      req.profile = task
      next()
    } catch (err) {
      return res.status(400).json({
        error: "Could not retrieve task"
      })
    }
  }
  const taskBytitle = async (req, res, next, id) => {
    try {
      //let user = await User.findById(id)
      console.log("Finding task by name "+id)
      let  task = await TaskModel.findOne({title: id});
      if (!task)
        return res.status(400).json({
          error: "title not found"
        })
      req.profile = task
      next()
    } catch (err) {
      return res.status(400).json({
        error: "Could not retrieve user by name: "+err
      })
    }
  }
 
   
  const read = (req, res) => {
   
    return res.json(req.profile)
  }
    const update = async (req, res) => {
        try {
          let task = req.profile
          task = lodash.extend(task, req.body)
          console.log(task)
          //console.log(task)
          task.updated = Date.now()
          
          await task.save()
    
          res.json(task)
          console.log(task)
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
      }
      
      const remove = async (req, res) => {
        try {
          const task = req.profile; // Task is populated by taskByID middleware
          if (!task) {
            return res.status(404).json({ error: "Task not found" });
          }
      
          const deletedTask = await task.deleteOne(); // Delete the task
          console.log("Task deleted:", deletedTask);
      
          res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask,
          });
        } catch (err) {
          console.error("Error deleting task:", err);
          return res.status(400).json({
            error: "Could not delete task",
          });
        }
      }
      export default {
        create,
        taskByID,
        taskBytitle,
        list,
        read,
        remove,
        update,
        
      
      }