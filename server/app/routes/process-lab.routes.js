const express = require("express");
const { authJwt } = require("../middlewares");
const ProcessLab = require("../controllers/process-lab.controller.js");

const router = express.Router();

router.get("/lab/:userId/:labId", [authJwt.verifyToken], ProcessLab.getLabById);
router.get("/lab/:userId", [authJwt.verifyToken], ProcessLab.getAll);
router.get("/lab/histroy/:labId", [authJwt.verifyToken], ProcessLab.getLabHistory);
router.get("/lab/user-history/:userId", [authJwt.verifyToken], ProcessLab.getLabUserHistory);

module.exports = router;
