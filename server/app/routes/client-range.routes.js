const express = require("express");
const { authJwt } = require("../middlewares");
const ClientRange = require("../controllers/client-range.controller.js");
const validation = require("../helpers/validations/patient.js");

const router = express.Router();

router.get(
  "/client-ranges",
  [authJwt.verifyToken],
  ClientRange.getClientRanges
);
router.delete(
  "/client-range",
  [authJwt.verifyToken],
  ClientRange.deleteClientRange
);
router.post(
  "/client-range/reset",
  [authJwt.verifyToken],
  ClientRange.resetClientRange
);
router.get("/client-range", [authJwt.verifyToken], ClientRange.getClientRange);
router.post(
  "/client-range",
  [authJwt.verifyToken],
  ClientRange.createClientRange
);
router.post(
  "/client-range/tests/search",
  [authJwt.verifyToken, validation.validate("search")],
  ClientRange.searchTests
);

module.exports = router;
