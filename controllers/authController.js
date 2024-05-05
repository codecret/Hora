import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import attachCookie from "../utils/attachCookies.js";

const CreateUser = async (req, res) => {
  const { password, name, email } = req.body;
  console.log(name, email, password);
  if (!name || !password || !email) {
    throw new BadRequestError("please provide all the values");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
    },
    user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials , no user!");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials , no match password!");
  }
  const token = user.createJWT();
  user.password = undefined;
  attachCookie({ res, token });
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name) {
    throw new BadRequestError("please provide all the values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.email = email;

  await user.save();

  const token = user.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({ user });
};
const allUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};
const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const deleteUser = async (req, res) => {
  const { id: UserId } = req.params;

  const user = await User.findOne({ _id: UserId });

  if (!user) {
    throw new NotFoundError(`No User with id ${UserId}.`);
  }
  await user.deleteOne();
  res.status(StatusCodes.OK).json({ msg: `Success! User removed` });
};
const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  res.status(StatusCodes.OK).json({ user });
};
export {
  CreateUser,
  allUsers,
  login,
  updateUser,
  logoutUser,
  deleteUser,
  getCurrentUser,
};
