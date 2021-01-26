const express = require("express");
const { authJwt } = require("../middlewares");
const PatientEncounter = require("../controllers/patient-encounter.controller.js");

const router = express.Router();

/** encounters */
router.get(
  "/patient/:patient_id/encounters",
  [authJwt.verifyToken],
  PatientEncounter.getEncounters
);
router.post(
  "/patient/:patient_id/encounters",
  [authJwt.verifyToken],
  PatientEncounter.createEncounter
);
router.put(
  "/patient/:patient_id/encounters/:id",
  [authJwt.verifyToken],
  PatientEncounter.updateEncounter
);
router.delete(
  "/patient/:patient_id/encounters/:id",
  [authJwt.verifyToken],
  PatientEncounter.deleteEncounter
);
router.get(
  "/patient/encounters/diagnoses/recent-diagnoses",
  [authJwt.verifyToken],
  PatientEncounter.getRecentDiagnoses
);


module.exports = router;
