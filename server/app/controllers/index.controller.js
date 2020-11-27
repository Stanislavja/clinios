const { validationResult } = require("express-validator");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");


const getUser = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(`SELECT u.id, u.client_id, u.firstname, u.lastname, u.email, u.admin, u.sign_dt,
    u.email_confirm_dt FROM user u WHERE u.id=${req.user_id}`);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    const user = dbResponse[0];
    if(user.admin){
      user.permissions = ["ADMIN"]
    }
    user.role = "CLIENT";
    successMessage.data = { user };
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getPatient = async (req, res) => {
  const { email } = req.body;
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select p.id, p.client_id, p.firstname, p.lastname, p.password, p.status, client.code from patient p JOIN client on p.client_id=client.id where p.id=${req.user_id}`
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    const user = dbResponse[0];
    user.role = "PATIENT";
    successMessage.data = { user };
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log('error:', error)
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getCorporateUser = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(`select id, admin, firstname, lastname, password from user where id='${req.user_id}' and client_id is null`);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    const user = dbResponse[0];
    console.log('user:', user)
    if(user.admin){
      user.permissions = ["ADMIN"]
    }
    user.role = "CORPORATE";
    successMessage.data = { user };
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log('error:', error)
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const users = {
  getUser,
  getPatient,
  getCorporateUser
};

module.exports = users;
