import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import { handleError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new userModel({
     ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been register successfully");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) return next(handleError(404, "user not found!"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(handleError(400, "wrong password or username!"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );

    const { password, isAdmin, ...otherDetails } = user._doc; //for not show password and isAdmin
    res
      .cookie("access_token", token, {
        httpOnly: true, // tag added to a browser cookie that prevents client-side scripts from accessing data.
      })
      .status(200)
      .json({details: {...otherDetails} , isAdmin });
  } catch (err) {
    next(err);
  }
};
