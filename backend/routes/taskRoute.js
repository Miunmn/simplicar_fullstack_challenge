import {
  getTasks,
  createTask,
  updateTask,
} from "../controllers/taskController.js";

import { body, query } from "express-validator";
import express from "express";

const router = express.Router();

router.get("/get-tasks", getTasks);

router.post(
  "/create-task",
  body("name")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1, max: 40 })
    .withMessage("Name must be at least 1 character long"),
  body("description")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 1 })
    .withMessage("Name must be at least 1 character long"),

  createTask
);

router.put(
  "/update-task",
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1, max: 40 })
    .withMessage("Name must be at least 1 character long"),
  body("description")
    .optional()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 1 })
    .withMessage("Name must be at least 1 character long"),
  body("status").optional(),
  updateTask
);
export default router;
