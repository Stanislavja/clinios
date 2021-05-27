const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const CPTcodes = require("../controllers/proc.controller");

const router = express.Router();

router.get("/proc", [authJwt.verifyToken], CPTcodes.getLabCompnayList);
router.post("/proc/search", [authJwt.verifyToken], CPTcodes.search);
router.post(
  "/proc/:id/:userId",
  [authJwt.verifyToken, authorization.isReadOnly],
  CPTcodes.updateClientCpt
);

module.exports = router;
