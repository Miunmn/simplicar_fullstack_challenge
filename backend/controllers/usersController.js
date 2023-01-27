import userService from '../services/userService.js';
import { validationResult } from 'express-validator';
import { matchedData } from 'express-validator';

async function login(req, res, next) {
  const body = matchedData(req, { locations: ['body'], includeOptionals: true });
  const email = body?.email;
  const password = body?.password;

  try {
    const result = await userService.getUser(email, password);
    const response = result ? true: false;
    res.json(response);
  } catch (err) {
    console.log('err', err);
    res.status(err.status).json({ message: err.message });    
  }
}

async function getUsers(req, res, next) {
  try {
      const result = await userService.getUsers()
      res.json(result);
  } catch (err) {
    console.log('err', err);
    res.status(err.status).json({ message: err.message });    
  }
}

// sign-up
async function createUser(req, res, next) {

  const body = matchedData(req, { locations: ['body'], includeOptionals: true });
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  
  try {
      const response = await userService.createUser(body) 
      res.json(response);
  } catch (err) {
    console.log('err', err);
    res.status(err.status).json({ message: err.message });    }
}

async function deleteUser(req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }
  
  try {
      const result = await userService.deleteUser(req.query.id)
      res.json(result);
  } catch (err) {
      console.log('err', err);
      res.status(err.status).json({ message: err.message });
  }
}

async function updateUser(req, res, next){
  
  const body = matchedData(req, { locations: ['body'], includeOptionals: true });

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const id = req?.query?.id;
  if (!id) res.status(400).json({errors: "User id cannot be null"})

  try{
    const result = await userService.updateUser(id, body);
    res.json(result);
  }

  catch(err){
    console.log('err', err);
    res.status(err.status).json({ message: err.message });
  }
}


export {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  login
}