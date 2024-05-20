import moment from "moment";
import jwt from "jsonwebtoken";

export const generateToken = (userId, expires, type) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};
