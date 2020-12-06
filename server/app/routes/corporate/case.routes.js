const express = require("express");
const { authJwt } = require("../../middlewares");
const indexController = require("../../controllers/corporate/case.controller");

const router = express.Router();

router.post(
  "/corporate/case",
  [authJwt.verifyToken],
  indexController.getCase
);

module.exports = router;
