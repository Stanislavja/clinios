const { validationResult } = require("express-validator");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAllUsers = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(`select u.id, u.firstname, u.lastname, u.title, u.email, u.status, u.type, u.schedule, u.appointments, u.admin, u.note
        , u.phone, u.login_dt, u.email_forward_user_id
        , u.created, concat(u2.firstname, ' ', u2.lastname) created_user
        , u.updated, concat(u3.firstname, ' ', u3.lastname) updated_user
        , u.updated, concat(u3.firstname, ' ', u3.lastname) forward_user
        from user u
        left join user u2 on u2.id=u.created_user_id
        left join user u3 on u3.id=u.updated_user_id
        left join user u4 on u4.id=u.email_forward_user_id
        where u.client_id=${req.client_id}
        order by u.created
        limit 100`);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getForwardEmailList = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(`select u.id, concat(u.firstname, ' ', u.lastname) name
        from user u 
        where u.client_id=${req.client_id}
        and u.id<>${req.user_id}
        and status<>'D'
        order by name
        limit 100`);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const createNewUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const db = makeDb(configuration, res);
  const user = req.body;
  user.client_id = req.client_id;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.title = req.body.title;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.note = req.body.note;
  user.status = req.body.status;
  user.appointments = req.body.appointments;
  user.type = req.body.type;
  user.schedule = req.body.schedule;
  user.admin = req.body.admin;
  user.email_forward_user_id = req.body.email_forward_user_id;
  user.created = new Date();
  user.created_user_id = req.user_id;
  user.updated = new Date();
  user.updated_user_id = req.user_id;

  try {
    const dbResponse = await db.query("insert into user set ?", user);

    if (!dbResponse.insertId) {
      errorMessage.error = "Creation not successful";
      res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    successMessage.message = "Creation successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.error = "Creation not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const db = makeDb(configuration, res);
  const user = req.body;

  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.title = req.body.title;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.note = req.body.note;
  user.status = req.body.status;
  user.appointments = req.body.appointments;
  user.type = req.body.type;
  user.schedule = req.body.schedule;
  user.admin = req.body.admin;
  user.email_forward_user_id = req.body.email_forward_user_id;
  user.updated = new Date();
  user.updated_user_id = req.user_id;

  try {
    const updateResponse = await db.query(
      `update user set ? where id =${req.params.id}`,
      [user]
    );

    if (!updateResponse.affectedRows) {
      errorMessage.error = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = updateResponse;
    successMessage.message = "Update successful";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Update not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const users = {
  getAllUsers,
  getForwardEmailList,
  createNewUser,
  updateUser,
};

module.exports = users;
