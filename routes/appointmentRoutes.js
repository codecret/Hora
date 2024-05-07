import express from "express";
const router = express.Router();

import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  allAppointments,
  userAppointments,
} from "../controllers/appointmentController.js";

router.route("/").post(createAppointment).get(allAppointments);
router.route("/user").get(userAppointments);
router.route("/:id").delete(deleteAppointment).patch(updateAppointment);

export default router;
