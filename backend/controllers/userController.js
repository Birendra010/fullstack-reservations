import userModel from "../models/User.js";


// update user
export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};
// delete user
export const deleteUser = async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

// get user by user id
export const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
