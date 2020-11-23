const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getAllPractitioner = async (req, res) => {
  const db = makeDb(configuration, res);

  let $sql;

  try {
    $sql = `select u.id user_id, concat(u.firstname, ' ', u.lastname) name
    from user u
    where u.client_id=${req.client_id}
    order by name
    limit 100`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.info("err:", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const Appointments = {
  getAllPractitioner,
};

module.exports = Appointments;
