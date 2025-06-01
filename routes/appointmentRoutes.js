import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
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

const __dirname = dirname(fileURLToPath(import.meta.url));
const appointmentRoutesSwagger = JSON.parse(
  readFileSync(
    join(__dirname, "../swagger/appointmentRoutesSwagger.json"),
    "utf8"
  )
);

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
