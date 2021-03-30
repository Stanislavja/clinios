const express = require("express");
const { authJwt } = require("../middlewares");
const ProcessLab = require("../controllers/process-lab.controller.js");

const router = express.Router();

router.get("/lab/assign-user", [authJwt.verifyToken], ProcessLab.getAssignUser);
router.get("/lab/:userId/:labId", [authJwt.verifyToken], ProcessLab.getLabById);
router.get("/lab/:userId", [authJwt.verifyToken], ProcessLab.getAll);
router.post("/lab", [authJwt.verifyToken], ProcessLab.createLab);
router.put("/lab/:labId", [authJwt.verifyToken], ProcessLab.updateLab);
router.put("/lab/update/:labId", [authJwt.verifyToken], ProcessLab.updateLabData);
router.get(
  "/lab/histroy/:labId",
  [authJwt.verifyToken],
  ProcessLab.getLabHistory
);
router.get(
  "/lab/user-history/:userId",
  [authJwt.verifyToken],
  ProcessLab.getLabUserHistory
);
router.get(
  "/lab/values/:labId",
  [authJwt.verifyToken],
  ProcessLab.getLabValues
);

module.exports = router;
