const express = require("express");
const { authJwt } = require("../../middlewares");
const PaymentMethodController = require("../../controllers/patient/paymentMethod.controller");

const router = express.Router();

router.get(
  "/client-portal/payment-methods",
  [authJwt.verifyToken],
  PaymentMethodController.getPaymentMethods
);
router.post(
  "/client-portal/payment-methods",
  [authJwt.verifyToken],
  PaymentMethodController.createPaymentMethod
);
router.put(
  "/client-portal/payment-methods/:id",
  [authJwt.verifyToken],
  PaymentMethodController.updatePaymentMethod
);
router.delete(
  "/client-portal/payment-methods/:id",
  [authJwt.verifyToken],
  PaymentMethodController.deletePaymentMethod
);
module.exports = router;
