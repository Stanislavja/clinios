const express = require("express");
const { authJwt } = require("../middlewares");
const stripeController = require("../controllers/stripe.controller");

const router = express.Router();


router.get(
  "/stripe/customers",
  [authJwt.verifyToken],
  stripeController.listOfCustomers
);

router.post(
  "/stripe/create-customer",
  [authJwt.verifyToken],
  stripeController.createCustomer
);
router.post(
  "/stripe/create-payment",
  [authJwt.verifyToken],
  stripeController.createPayment
);
router.get(
  "/stripe/create-payment-method/:id",
  [authJwt.verifyToken],
  stripeController.getPaymentMethod
);
router.post(
  "/stripe/create-payment-method",
  [authJwt.verifyToken],
  stripeController.createPaymentMethod
);

module.exports = router;
