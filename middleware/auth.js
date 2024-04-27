import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

export const extractAuth = async (req, _res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (error) {
      req.user = null;
    }
  }
  next();
};

export const withAuth = async (req, _res, next) => {
  if (!req.user) throw new UnAuthenticatedError("authentication invalid.");
  next();
};
export const withAuthAdmin = async (req, _res, next) => {
  if (!req.user || !req.user.isAdmin)
    throw new UnAuthenticatedError("authentication invalid.");
  next();
};
