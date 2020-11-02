const { configuration, makeDb } = require("./../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("./../../helpers/status");

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

const updateMessage = async (req, res) => {
  const { messageId } = req.params;

  const db = makeDb(configuration, res);

  try {
    let $sql = `update message
      set read_dt=now()
      where client_id=${req.client_id}
      and patient_id_to=${req.user_id}
      and read_dt is null 
      and id=${messageId}`;

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

const getSingelMessage = async (req, res) => {
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

const Support = {
  getAllMessages,
  updateMessage,
  getSingelMessage,
};

module.exports = Support;
