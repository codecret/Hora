import express from "express";
const router = express.Router();

import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  allAppointments,
  userAppointments,
  getAppointmentsStats,
} from "../controllers/appointmentController.js";

router.route("/").post(createAppointment).get(allAppointments);
router.route("/user").get(userAppointments);
router.route("/stats").get(getAppointmentsStats);
router.route("/:id").delete(deleteAppointment).patch(updateAppointment);

export default router;
