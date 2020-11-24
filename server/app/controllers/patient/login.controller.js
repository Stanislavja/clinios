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
 * This function let patient to signin into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signin = async (req, res) => {
  const db = makeDb(configuration, res);

  const { client_id, email } = req.body;
  const rows = await db.query(
    `select id, client_id, firstname, lastname, password, status from patient where client_id=${client_id} and email='${email}'`
  );

  const patient = rows[0];
  if (!patient) {
    errorMessage.message = "Patient not found";
    errorMessage.patient = patient;
    return res.status(status.notfound).send(errorMessage);
  }

  const isPasswordValid = bcrypt.compareSync(
    req.body.password,
    patient.password
  );

  if (!isPasswordValid) {
    errorMessage.message = "Wrong password!";
    errorMessage.patient = patient;
    return res.status(status.unauthorized).send(errorMessage);
  }

  // TODO:: if password not correct, and more than 20 times, then lock for 5 minutes, and print message "Account locked for 5 minutes"
  if (patient.status !== "A") {
    errorMessage.message = "Patient portal status is not active";
    return res.status(status.error).send(errorMessage);
  }

  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  await db.query(
    `update patient set login_dt='${now}', updated= now(), updated_user_id='${req.user_id}' where id=${patient.id}`
  );

  const token = jwt.sign(
    { id: patient.id, client_id: patient.client_id },
    config.authSecret,
    {
      expiresIn: 86400, // 24 hours
      // expiresIn: 5 * 60, // 2minutes
    }
  );

  const resData = {};
  resData.accessToken = token;
  delete patient.password; // delete password from response
  resData.user = patient;
  successMessage.data = resData;
  res.status(status.success).send(successMessage);
};
