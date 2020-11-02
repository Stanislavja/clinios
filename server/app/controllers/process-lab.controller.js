const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

// TODO:: Incomplete code.
const getAll = async (req, res) => {
  const db = makeDb(configuration, res);

  const user_id = (req.body.data && req.body.data.user_id) || null;

  try {
    const dbResponse = await db.query(
      `select functional_range
        from client
        where id=${user_id}
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const processLab = {
  getAll,
};

module.exports = processLab;
