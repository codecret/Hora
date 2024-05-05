import express from "express";
const router = express.Router();

import {
  CreateUser,
  login,
  allUsers,
  logoutUser,
  deleteUser,
  updateUser,
  getCurrentUser,
} from "../controllers/authController.js";
import { withAuth } from "../middleware/auth.js";

router.route("/createUser").post(CreateUser);
router.route("/login").post(login);
router.route("/allUsers").get(withAuth, allUsers);
router.get("/logout", logoutUser);
router.route("/:id").delete(withAuth, deleteUser).patch(withAuth, updateUser);
router.route("/:id");
router.route("/getCurrentUser").get(withAuth, getCurrentUser);

export default router;
