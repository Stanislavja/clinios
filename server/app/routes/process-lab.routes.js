const express = require("express");
const { authJwt } = require("../middlewares");
const ProcessLab = require("../controllers/process-lab.controller.js");

const router = express.Router();

router.get("/process-lab", [authJwt.verifyToken], ProcessLab.getAll);

module.exports = router;
