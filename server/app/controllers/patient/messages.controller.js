const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getAllMessages = async (req, res) => {
  const db = makeDb(configuration, res);
  let $sql;

  try {
    $sql = `select m.id, m.created
    , concat(u.firstname, ' ', u.lastname) user_to_from
    , concat(u2.firstname, ' ', u2.lastname) user_to_name
    , m.subject , m.message
    from message m
    left join user u on u.id=m.user_id_from
    left join user u2 on u2.id=m.user_id_to
    where (patient_id_from=${req.user_id} or patient_id_to=${req.user_id})
    order by m.created desc
    limit 50`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const createMessage = async (req, res) => {
  const { user_id_to } = req.body.data;
  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into message (client_id, user_id_to, patient_id_from, status, created) values (${req.client_id}, ${user_id_to}, ${req.user_id}, 'O', now())`
    );
    if (!insertResponse.affectedRows) {
      errorMessage.error = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  let { msgStatus } = req.body.data;
  const { user_id_to, subject, message } = req.body.data;

  const db = makeDb(configuration, res);

  if (typeof msgStatus !== "undefined") {
    msgStatus = `'${msgStatus}'`;
  } else {
    msgStatus = null;
  }

  try {
    let $sql = `update message set user_id_to=${user_id_to}, subject='${subject}', message='${message}', status=${msgStatus}, read_dt=now() `;
    $sql += `, updated=now(), updated_user_id=${req.user_id} where id=${messageId}`;

    const updateResponse = await db.query($sql);

    if (!updateResponse.affectedRows) {
      errorMessage.error = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = updateResponse;
    successMessage.message = "Update successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Update not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getSingleMessage = async (req, res) => {
  const db = makeDb(configuration, res);
  let $sql;
  try {
    $sql = `select cp.id, cp.header
      from client_portal cp
      where cp.id =${req.client_id}`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const Messages = {
  getAllMessages,
  createMessage,
  updateMessage,
  getSingleMessage,
};

module.exports = Messages;
