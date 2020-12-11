const express = require("express");
const { authJwt } = require("../../middlewares");
const billingsController = require("../../controllers/patient/billings.controller");

const router = express.Router();

router.get(
  "/client-portal/billings",
  [authJwt.verifyToken],
  billingsController.getBillings
);

router.post(
  "/client-portal/billings",
  [authJwt.verifyToken],
  billingsController.createBilling
);

module.exports = router;
