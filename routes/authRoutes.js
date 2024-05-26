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
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { withAuth } from "../middleware/auth.js";
import ImgUpload from "../middleware/imgUpload.js";
import Multer from "multer";
import swaggerUi from "swagger-ui-express";
import authRoutesSwagger from "../swagger/authRoutesSwagger.json" assert { type: "json" };

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
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
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.use(
  "/api-docs",
  swaggerUi.serveFiles(authRoutesSwagger),
  swaggerUi.setup(authRoutesSwagger)
);
export default router;
