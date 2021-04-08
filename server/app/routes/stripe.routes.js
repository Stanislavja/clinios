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

module.exports = router;
