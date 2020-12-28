const express = require("express");
const { authJwt } = require("../middlewares");
const handouts = require("../controllers/handouts.controller.js");

const router = express.Router();

// TODO:: Incomplete, need to be completed
router.get("/handouts", [authJwt.verifyToken], handouts.getAll);

module.exports = router;
