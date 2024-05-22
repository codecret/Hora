import express from "express";
const router = express.Router();

import {
  approveRequest,
  getApprovalForUser,
  rejectApproveRequest,
} from "../controllers/ApprovalController.js";
import { withAuth } from "../middleware/auth.js";

router.route("/").get(withAuth, getApprovalForUser);

router.route("/:id").delete(approveRequest);
router.route("/reject/:id").delete(rejectApproveRequest);
export default router;
