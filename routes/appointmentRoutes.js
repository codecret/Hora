import express from "express";
const router = express.Router();

import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  allAppointments,
  // userAppointments,
  allAppointmentsSearch,
  deleteAllAppointments,
} from "../controllers/appointmentController.js";

router
  .route("/")
  .post(createAppointment)
  .get(allAppointments)
  .delete(deleteAllAppointments);
router.route("/search").get(allAppointmentsSearch);
// router.route("/user").get(userAppointments);
router.route("/:id").delete(deleteAppointment).patch(updateAppointment);

export default router;
