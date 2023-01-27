import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
} from "../controllers/usersController.js";
import { body, query } from "express-validator";
import express from "express";

const router = express.Router();

router.get("/get-users", getUsers);

// bail()
router.post(
  "/login",

  body("email")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),

  body("password")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Password is required")
    .isString()
    .withMessage("Note must be a string")
    .isLength({ min: 1 })
    .withMessage("Note must be at least 1 character long"),

  login
);

router.post(
  "/create-user",
  body("first_name")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 1 })
    .withMessage("First name must be at least 1 character long"),

  body("email")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),

  body("password")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Password is required")
    .isString()
    .withMessage("Note must be a string")
    .isLength({ min: 1 })
    .withMessage("Note must be at least 1 character long"),

  createUser
);

router.put(
  "/update-user",
  query("id")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Id is invalid")
    .isLength({ min: 12 })
    .withMessage("Id must be at least 12 character long"),

  body("first_name")
    .if(body("first_name").exists())
    .notEmpty()
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 1 })
    .withMessage("First name must be at least 1 character long"),

  body("email")
    .if(body("email").exists())
    .notEmpty()
    .isEmail()
    .withMessage("Email is invalid"),

  body("password")
    .if(body("password").exists())
    .notEmpty()
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 1 })
    .withMessage("Note must be at least 1 character long"),

  updateUser
);

router.delete(
  "/delete-user",
  query("id")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Id is invalid")
    .isLength({ min: 12 })
    .withMessage("Id must be specified and 12 characters long"),
  deleteUser
);

export default router;
