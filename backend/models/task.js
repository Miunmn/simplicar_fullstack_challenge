import mongoose from "mongoose";

const Task = mongoose.model("task", {
  name: {
    type: String,
    lowercase: true,
    required: [true, "Task name cannot be blank"],
    minlength: [1, "Minimum 1 characters required"],
    maxlength: [40, "First name cannot be that long"],
  },
  description: {
    type: String,
    lowercase: true,
    required: [true, "Desciption cannot be blank"],
    minlength: [1, "Minimum 1 characters required"],
    maxlength: [120, "Desciption cannot be that long"],
  },
  status: {
    type: String,
    lowercase: true,
    default: "buffer",
  },
});

const nameTask = "Agregar subtareas al kanban";
Task.findOne({name: nameTask}, function (err, task){
  if(err) {
    console.log(err)
    return;
  }
  if (task) return;
  Task.insertMany(
    [
      {
        status: "buffer",
        name: nameTask,
        description: "Agregar subtareas al kanban description",
      },
      {
        status: "working",
        name: "Testing Kanban",
        description: "Testing Kanban",
      },
    ],
    (err, res) => {
      if (err) return handleError(err);
      else return console.log("Result: ", res);
    }
  );
})


export default Task;
