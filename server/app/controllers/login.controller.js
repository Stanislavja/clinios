const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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

  const db = makeDb(configuration, res);

  const rows = await db.query(`select u.id, u.admin, u.client_id, u.firstname, u.lastname, u.email,
   u.password, u.sign_dt, u.email_confirm_dt, c.name, c.calendar_start_time, c.calendar_end_time
   from user u
   left join client c on c.id=u.client_id 
   where u.email=?
   and client_id is not null`, [req.body.email]); // client_id is not null to prevent corp logins

  const user = rows[0];
  if (!user) {
    errorMessage.message = "User not found";
    errorMessage.user = user;
    return res.status(status.notfound).send(errorMessage);
  }
  if (user.admin) {
    user.permissions = ["ADMIN"];
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
      "Login can not be done until the email address is confirmed. Please see the request in your email inbox.";
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
  await db.query(
    `UPDATE user SET login_dt=now(), updated= now(), updated_user_id=? WHERE id =?`, [user.id, user.id]
  );

  const token = jwt.sign(
    { id: user.id, client_id: user.client_id, role: "CLIENT" },
    config.authSecret,
    {
      expiresIn: 86400, // 24 hours
    }
  );
  const resData = {};
  resData.accessToken = token;
  delete user.password; // delete password from response
  resData.user = user;
  resData.user.role = "CLIENT";
  resData.user.login_url = `/login_client`;
  successMessage.data = resData;
  res.status(status.success).send(successMessage);
};
