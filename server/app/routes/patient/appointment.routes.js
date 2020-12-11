const express = require("express");
const { authJwt } = require("../../middlewares");
const encountersController = require("../../controllers/patient/appointment.controller");

const router = express.Router();

router.get(
  "/client-portal/practitioners",
  [authJwt.verifyToken],
  encountersController.getAllPractitioner
);

router.post(
  "/client-portal/appointment-types",
  [authJwt.verifyToken],
  encountersController.getAppointmentTypes
);

router.post(
  "/client-portal/appointment",
  [authJwt.verifyToken],
  encountersController.createAppointment
);

module.exports = router;
