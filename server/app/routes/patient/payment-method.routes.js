const express = require("express");
const { authJwt } = require("../../middlewares");
const paymentMethodController = require("../../controllers/patient/paymentMethod.controller");

const router = express.Router();

router.get(
  "/client-portal/payment-methods",
  [authJwt.verifyToken],
  paymentMethodController.getPaymentMethods
);

module.exports = router;
