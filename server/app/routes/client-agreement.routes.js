const express = require("express");
const { authJwt } = require("../middlewares");
const Client = require("../controllers/client-agreement.controller.js");

const router = express.Router();

router.get("/client/agreement", [authJwt.verifyToken], Client.getAgreement);

module.exports = router;
