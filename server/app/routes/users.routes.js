const express = require("express");
const { authJwt } = require("../middlewares");
const Users = require("../controllers/users.controller");

const router = express.Router();

router.get("/allusers", [authJwt.verifyToken], Users.getAllUsers);
router.get("/forwardemail", [authJwt.verifyToken], Users.getForwardEmailList);
router.post("/user", [authJwt.verifyToken], Users.createNewUser);
router.put("/user/:userId/:id", [authJwt.verifyToken], Users.updateUser);

module.exports = router;
