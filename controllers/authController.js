import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import attachCookie from "../utils/attachCookies.js";

const CreateUser = async (req, res) => {
  const { username, password, name, phoneNumber, email } = req.body;
  if (!username || !password || !name) {
    throw new BadRequestError("please provide all the values");
  }

  const user = await User.create({
    username,
    name,
    email,
    password,
    phoneNumber,
  });

  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
    },
    user,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if ((!username, !password)) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ username }).select("+password");
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
  const { username, email } = req.body;
  if (!username) {
    throw new BadRequestError("please provide all the values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.username = username;
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

export { CreateUser, allUsers, login, updateUser, logoutUser, deleteUser };
