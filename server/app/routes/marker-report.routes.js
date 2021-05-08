const express = require("express");
const { authJwt } = require("../middlewares");
const testReports = require("../controllers/marker-report.controller.js");

const router = express.Router();

router.get("/tests", [authJwt.verifyToken], testReports.getFunctionalRange);
router.get(
  "/tests/page-title/:cptId",
  [authJwt.verifyToken],
  testReports.getPageTitle
);
router.get(
  "/tests/lab-marker/:patientId/:labId",
  [authJwt.verifyToken],
  testReports.getLabcptByLabId
);
router.get(
  "/tests/lab-marker/:patientId/lab/:labId",
  [authJwt.verifyToken],
  testReports.getLabcptByLabId
);
router.get(
  "/tests/lab-marker/:patientId",
  [authJwt.verifyToken],
  testReports.getLabcpt
);
router.get(
  "/tests/graph/:patientId/:labId",
  [authJwt.verifyToken],
  testReports.getTestGraph
);
router.get(
  "/tests/conventionalrange/:patientId/:cptId",
  [authJwt.verifyToken],
  testReports.getConventionalRange
);
module.exports = router;
