const express = require("express");
const { authJwt } = require("../middlewares");
const ClientRange = require("../controllers/client-range.controller.js");

const router = express.Router();

router.get("/client-range", [authJwt.verifyToken], ClientRange.deleteClientRange);

module.exports = router;
