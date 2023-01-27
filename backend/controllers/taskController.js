import taskService from "../services/taskService.js";
import { validationResult } from "express-validator";
import { matchedData } from "express-validator";

async function getTasks(req, res, next) {
  try {
    const result = await taskService.getTasks();
    res.json(result);
  } catch (err) {
    console.log("err", err);
    res.status(err.status).json({ message: err.message });
  }
}

async function createTask(req, res, next) {
  const body = matchedData(req, {
    locations: ["body"],
    includeOptionals: true,
  });
  
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });

  try {
    const response = await taskService.createTask(body);
    res.json(response);
  } catch (err) {
    console.log("err", err);
    res.status(err.status).json({ message: err.message });
  }
}
async function updateTask(req, res, next){
  const body = matchedData(req, { locations: ['body'], includeOptionals: true });

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const id = req?.query?.id;
  if (!id) res.status(400).json({errors: "Task id cannot be null"})

  try{
    const result = await taskService.updateTask(id, body);
    res.json(result);
  }

  catch(err){
    console.log('err', err);
    res.status(err.status).json({ message: err.message });
  }
}
export { getTasks, createTask, updateTask };
