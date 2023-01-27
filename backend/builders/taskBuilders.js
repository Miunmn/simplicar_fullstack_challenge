import { capitalize } from "../helpers/stringFunctions.js";
const buildTasksData = (tasks) => {
    const bufferTasks = tasks.filter((task) => task.status === "buffer");
    const workingTasks = tasks.filter((task) => task.status === "working");
    const doneTasks = tasks.filter((task) => task.status === "done");

    const processData = [bufferTasks, workingTasks, doneTasks].map((taskGroup) => {
        return taskGroup.map((task) => {
            return {
                id: task._id,
                title: capitalize(task.name),
                description: capitalize(task.description)
            }
        })
    });

    const buildTasks = {
        buffer: {
            title: "buffer",
            items: processData[0]
        },
        working: {
            title: "working",
            items: processData[1]
        },
        done: {
            title: "done",
            items: processData[2]
        }
    };

    return buildTasks;
}

export {
    buildTasksData
}