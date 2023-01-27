import User from "../models/user.js";
import mongoose from "mongoose";

// login
async function getUser(email, password) {
  return new Promise(function (resolve, reject){
    console.log("email", email)
    const query = User.findOne({email: email, password: password});
    query.exec(function(err, user){
      if(err){
        const error = new Error("Error while fetching user using email");
        error.status = 500;
        return reject(error);
      }
      return resolve(user);
    });
  });
}


async function getUsers() {
  return new Promise(function (resolve, reject) {
    const query = User.find({});
    query.exec(function (err, users) {
      if (err) {
        const error = new Error("Error while fetching users");
        error.status = 500;
        return reject(error);
      }
      return resolve(users);
    });
  });
}
// signUp
async function createUser(newUserData) {
  return new Promise(function (resolve, reject) {
    User.create(newUserData, function (err, usr) {
      if (err) {
        console.log(err)
        const error = new Error("Error while creating user");
        error.status = 500;
        return reject(error);
      }
      return resolve(usr);
    });
  });
}

async function deconsteUser(user_id) {
  return new Promise(function (resolve, reject) {
    user_id = mongoose.Types.ObjectId(user_id);

    User.exists({ _id: user_id }, function (err, exists) {
      if (err) {
        const error = new Error("Error while creating user");
        error.status = 500;
        return reject(error);
      }
      if (!exists) {
        const error = new Error("User not found");
        error.status = 400;
        return reject(error);
      }
    });

    User.findOneAndRemove({ _id: user_id }, function (err, usr) {
      if (err) {
        return reject({ message: "Error while deconsting user" });
      }
      return resolve(usr);
    });
  });
}

async function updateUser(user_id, updateData) {
  return new Promise(function (resolve, reject) {
    user_id = mongoose.Types.ObjectId(user_id);
    const updateId = { _id: user_id };

    User.exists(updateId, function (err, exists) {
      if (err) {
        console.log("err", err);
        const error = new Error("Error while updating user");
        error.status = 500;
        return reject(error);
      }

      if (!exists) {
        const error = new Error("User not found");
        error.status = 400;
        return reject(error);
      }

      delete updateData._id;

      Object.keys(updateData).forEach((k) => {
        if (!updateData[k]) delete updateData[k];
      });

      User.findByIdAndUpdate(
        updateId,
        { $set: updateData },
        function (err, usr) {
          if (err) {
            console.log("err", err);
            const error = new Error("Error while updating user");
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
  getUsers,
  createUser,
  deconsteUser,
  updateUser,
  getUser
};
