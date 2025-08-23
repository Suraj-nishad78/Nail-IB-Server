// imports package 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepo from "./user.repositoy.js";

//signup method 
const signupUser = async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body;
    const encryptPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email: email.toLowerCase(),
      username:username.toLowerCase(),
      password: encryptPassword,
    };

    //to check user email exist or not 
    const emailExist = await userRepo.signin(email.toLowerCase());
    if (emailExist) {
      return res
        .status(400)
        .json({ error: "Email already exist!" });
    }

    //thow an error when signup failed
    const user = await userRepo.signup(newUser);
    if (!user) {
      return res
        .status(400)
        .json({ error: "User sign up failed. Please try again!" });
    }

    //response user successfully signup
    res.status(201).json({
      status: "Success",
      msg: "User sign up successfully!",
      user,
    });
  } catch (err) {
    console.log("Error while sign ", err);
    return res
        .status(500)
        .json({ error: "oops! something went wrong...Try again later!" });
  }
};

//user login method
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepo.signin(email.toLowerCase());

    //throw an error email doesn't exist 
    if (!user) {
      return res.status(400).json({ error: "Email not found!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    //password doesn't match with data
    if (!checkPassword) {
      return res.status(400).json({ error: "Invalid password!" });
    }

    //token generation
    const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
      expiresIn: "10m",
    });

    //response successfully login
    res
      .cookie("jwtToken", token, { httpOnly: true, maxAge: 10 * 60 * 1000 })
      .status(200)
      .json({
        status: "Success",
        msg: "User sign in successfully!",
        token,
        id: user._id,
      });
  } catch (err) {
    res.status(500).json({ error: "Server error, please try again later." });
  }
};

//logout method
const logoutUser = (req, res, next) => {
  try {
    const { jwtToken } = req.cookies;

    return res.clearCookie("jwtToken").status(200).json({
      status: "Success",
      msg: "You are logout successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: "oops! something went wrong...Try again later!",
    });
  }
};

//get all user details
const allUsers = async (req, res, next) => {
  try {
    const users = await userRepo.getUsers();
    if (!users.length) {
      //   throw new customErrorHandler(404, "No user found!");
      return res.status(400).json({
        status: 404,
        message: "No user found!",
      });
    }
    res.status(200).json({
      status: "Success",
      users,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: "oops! something went wrong...Try again later!",
    });
  }
};

//get a user detail method
const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userRepo.findOneUser(userId);
    if (!user) {
      return res.status(400).json({
        status: 404,
        message: "No user found!",
      });
    }
    res.status(200).json({
      status: "Success",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: "oops! something went wrong...Try again later!",
    });
  }
};

export { allUsers, loginUser, signupUser, logoutUser, getUserDetails };
