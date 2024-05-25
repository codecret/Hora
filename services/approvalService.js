import Approvals from "../models/Approvals.js";

export const createApproval = async (userBody) => {
  return Approvals.create(userBody);
};
