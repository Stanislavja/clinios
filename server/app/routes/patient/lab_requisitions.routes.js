const express = require("express");
const { authJwt } = require("../../middlewares");
const labRequisitionController = require("../../controllers/patient/lab_requisitions.controller");

const router = express.Router();

router.get(
  "/client-portal/lab_requisitions",
  [authJwt.verifyToken],
  labRequisitionController.getLabRequitions
);

module.exports = router;
