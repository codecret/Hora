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
  editProfile,
} from "../controllers/authController.js";
import { withAuth } from "../middleware/auth.js";
import ImgUpload from "../middleware/imgUpload.js";
import Multer from "multer";

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
console.log(multer);
router.route("/createUser").post(CreateUser);
router.route("/login").post(login);
router.route("/allUsers").get(withAuth, allUsers);
router.get("/logout", logoutUser);
router.route("/:id").delete(withAuth, deleteUser).patch(withAuth, updateUser);
router.route("/:id");
router.route("/getCurrentUser").get(withAuth, getCurrentUser);
router
  .route("/editProfile")
  .post(multer.single("file"), ImgUpload.uploadToGcs, withAuth, editProfile);

export default router;
