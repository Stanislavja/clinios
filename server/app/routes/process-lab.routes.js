const express = require("express");
const { authJwt } = require("../middlewares");
const ProcessLab = require("../controllers/process-lab.controller.js");

const router = express.Router();

router.get("/lab/:userId/:labId", [authJwt.verifyToken], ProcessLab.getLabById);
router.get("/lab/:userId", [authJwt.verifyToken], ProcessLab.getAll);

module.exports = router;
