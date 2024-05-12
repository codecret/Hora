import express from "express";
const router = express.Router();

import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  allAppointments,
  userAppointments,
  allAppointmentsSearch,
} from "../controllers/appointmentController.js";

router.route("/").post(createAppointment).get(allAppointments);
router.route("/search").get(allAppointmentsSearch);
router.route("/user").get(userAppointments);
router.route("/:id").delete(deleteAppointment).patch(updateAppointment);

export default router;
