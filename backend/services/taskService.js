import Task from "../models/task.js";
import mongoose from "mongoose"
import { buildTasksData } from "../builders/taskBuilders.js";
async function getTasks() {
    return new Promise(function (resolve, reject) {
      const query = Task.find({});
      query.exec(function (err, tasks) {
        if (err) {
          const error = new Error("Error while fetching tasks");
          error.status = 500;
          return reject(error);
        }
        const buildTasks = buildTasksData(tasks);
        return resolve(buildTasks);
      });
    });
}

// signUp
async function createTask(newTaskData) {
    return new Promise(function (resolve, reject) {
        Task.create(newTaskData, function (err, task) {
        if (err) {
          console.log(err)
          const error = new Error("Error while creating task");
          error.status = 500;
          return reject(error);
        }
        return resolve(task);
      });
    });
  }

  async function updateTask(taskId, updateData) {
    return new Promise(function (resolve, reject) {
      taskId = mongoose.Types.ObjectId(taskId);
      const updateId = { _id: taskId };
  
      Task.exists(updateId, function (err, exists) {
        if (err) {
          console.log("err", err);
          const error = new Error("Error while updating task");
          error.status = 500;
          return reject(error);
        }
  
        if (!exists) {
          const error = new Error("Task not found");
          error.status = 400;
          return reject(error);
        }
  
        delete updateData._id;
  
        Object.keys(updateData).forEach((k) => {
          if (!updateData[k]) delete updateData[k];
        });
  
        Task.findByIdAndUpdate(
          updateId,
          { $set: updateData },
          function (err, usr) {
            if (err) {
              console.log("err", err);
              const error = new Error("Error while updating task");
              error.status = 500;
              return reject(error);
            }
            return resolve(updateData);
          }
        );
      });
    });
  }
export default {
    getTasks,
    updateTask,
    createTask
}