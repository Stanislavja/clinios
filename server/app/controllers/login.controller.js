const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { validationResult } = require("express-validator");
const config = require("../../config");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

/**
 * This function let user to signin into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signin = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }

  const db = makeDb(configuration, res);

  const rows = await db.query(
    "SELECT id, client_id, firstname, lastname, email, password, sign_dt, email_confirm_dt FROM user WHERE email = ?",
    [req.body.email]
  );

  const user = rows[0];
  if (!user) {
    errorMessage.message = "User not found";
    errorMessage.user = user;
    return res.status(status.notfound).send(errorMessage);
  }
  const clientRows = await db.query(
    "SELECT id, name FROM client WHERE id = ?",
    [user.client_id]
  );

  if (!user.sign_dt) {
    errorMessage.message =
      "The password for this additional user can not be reset until user registration has first been completed.";
    delete user.password; // delete password from response
    const clientResult = clientRows[0];
    user.client = clientResult;
    errorMessage.user = user;
    return res.status(status.unauthorized).send(errorMessage);
  }
  if (!user.email_confirm_dt) {
    errorMessage.message =
      "Login can not be done until the email address is confirmed.  Please see the request in your email inbox.";
    delete user.password; // delete password from response
    errorMessage.user = user;
    return res.status(status.unauthorized).send(errorMessage);
  }
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) {
    errorMessage.message = "Wrong password!";
    errorMessage.user = user;
    return res.status(status.unauthorized).send(errorMessage);
  }

  // update user login_dt
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  await db.query(`UPDATE user SET login_dt='${now}' WHERE id =${user.id}`);

  const token = jwt.sign(
    { id: user.id, client_id: user.client_id },
    config.authSecret,
    {
      expiresIn: 86400, // 24 hours
      // expiresIn: 5 * 60, // 2minutes
    }
  );
  user.accessToken = token;
  delete user.password; // delete password from response
  successMessage.data = user;
  res.status(status.success).send(successMessage);
};
