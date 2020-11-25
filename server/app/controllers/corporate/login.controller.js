const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const config = require("../../../config");
const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

/**
 * This function let Corporate user to signin into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signin = async (req, res) => {
  const db = makeDb(configuration, res);

  const { email } = req.body;
  const rows = await db.query(
    `select user.id, user.firstname, user.lastname, user.password, roles.role from user JOIN roles
    ON user.role_id=roles.id  where email='${email}' and client_id is null`
  );

  const user = rows[0];
  if (!user) {
    errorMessage.message = "User not found";
    errorMessage.user = user;
    return res.status(status.notfound).send(errorMessage);
  }

  const isPasswordValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    errorMessage.message = "Wrong password!";
    errorMessage.user = user;
    return res.status(status.unauthorized).send(errorMessage);
  }

  const token = jwt.sign(
    { id: user.id },
    config.authSecret,
    {
      expiresIn: 86400, // 24 hours
    }
  );

  const resData = {};
  resData.accessToken = token;
  delete user.password; // delete password from response
  resData.user = user;
  successMessage.data = resData;
  res.status(status.success).send(successMessage);
};
