import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepo from "./user.repositoy.js";

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
    const emailExist = await userRepo.signin(email.toLowerCase());
    if (emailExist) {
      return res
        .status(400)
        .json({ error: "Email already exist!" });
    }

    const user = await userRepo.signup(newUser);
    if (!user) {
      return res
        .status(400)
        .json({ error: "User sign up failed. Please try again!" });
    }

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

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepo.signin(email.toLowerCase());

    if (!user) {
      return res.status(400).json({ error: "Email not found!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ error: "Invalid password!" });
    }

    const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
      expiresIn: "10m",
    });

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

const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userRepo.findOneUser(userId);
    if (!user) {
      // throw new customErrorHandler(404, "No user found!")
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
