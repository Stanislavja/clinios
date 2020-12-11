const express = require("express");
const { authJwt } = require("../middlewares");
const IndexController = require("../controllers/index.controller");

const router = express.Router();

router.get("/auth/user", [authJwt.verifyToken], IndexController.getUser);
router.get("/auth/patient", [authJwt.verifyToken], IndexController.getPatient);
router.get(
  "/auth/corporate-user",
  [authJwt.verifyToken],
  IndexController.getCorporateUser
);

module.exports = router;
