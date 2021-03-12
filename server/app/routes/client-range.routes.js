const express = require("express");
const { authJwt } = require("../middlewares");
const ClientRange = require("../controllers/client-range.controller.js");

const router = express.Router();

router.get("/client-range", [authJwt.verifyToken], ClientRange.deleteClientRange);
router.post("/client-range", [authJwt.verifyToken], ClientRange.createClientRange);
router.get("/client-ranges", [authJwt.verifyToken], ClientRange.getClientRanges);

module.exports = router;
