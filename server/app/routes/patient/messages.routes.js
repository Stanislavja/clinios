const express = require("express");
const { authJwt } = require("../../middlewares");
const messagesController = require("../../controllers/patient/messages.controller");

const router = express.Router();

router.get(
  "/client-portal/messages",
  [authJwt.verifyToken],
  messagesController.getAllMessages
);
router.post(
  "/client-portal/messages",
  [authJwt.verifyToken],
  messagesController.createMessage
);
router.put(
  "/client-portal/messages/:messageId",
  [authJwt.verifyToken],
  messagesController.updateMessage
);
router.get(
  "/client-portal/messages/:messageId",
  [authJwt.verifyToken],
  messagesController.getSingleMessage
);

module.exports = router;
