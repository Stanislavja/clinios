const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");


const getAll = async (req, res) => {
  const db = makeDb(configuration, res);
  const { userId } = req.params;

  try {
    const dbResponse = await db.query(
      `select h.filename, h.created, concat(u.firstname, ' ', u.lastname) name, h.client_id
      from handout h
      left join user u on u.id=h.created_user_id
      where h.client_id=${req.client_id}
      order by h.filename
      limit 100`
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const handouts = {
  getAll
};

module.exports = handouts;
