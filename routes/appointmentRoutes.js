import express from "express";
const router = express.Router();

import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  allAppointments,
  userAppointments,
  allAppointmentsSearch,
  deleteAllAppointments,
} from "../controllers/appointmentController.js";
import swaggerUi from "swagger-ui-express";
import appointmentRoutesSwagger from "../swagger/appointmentRoutesSwagger.json" assert { type: "json" };

router
  .route("/")
  .post(createAppointment)
  .get(allAppointments)
  .delete(deleteAllAppointments);
router.route("/search").get(allAppointmentsSearch);
// router.route("/user").get(userAppointments);
router.route("/:id").delete(deleteAppointment).patch(updateAppointment);

router.use(
  "/api-docs",
  swaggerUi.serveFiles(appointmentRoutesSwagger),
  swaggerUi.setup(appointmentRoutesSwagger)
);
export default router;
