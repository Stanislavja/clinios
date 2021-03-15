const express = require("express");
const { authJwt } = require("../middlewares");
const userMessagesController = require("../controllers/message-to-user.controller.js");

const router = express.Router();

router.get(
  "/user/messages/:id",
  [authJwt.verifyToken],
  userMessagesController.getUserMessageById
);
router.get(
  "/user/messages",
  [authJwt.verifyToken],
  userMessagesController.getUserMessage
);
router.post("/user/message", [authJwt.verifyToken], userMessagesController.createMessage);
router.put(
  "/user/message/:id",
  [authJwt.verifyToken],
  userMessagesController.updateMessage
);

module.exports = router;
