const express = require("express");
const { authJwt } = require("../../middlewares");
const encountersController = require("../../controllers/patient/appointment.controller");

const router = express.Router();

router.get(
  "/client-portal/practitioners",
  [authJwt.verifyToken],
  encountersController.getAllPractitioner
);

module.exports = router;
