const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAgreement = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const rows = await db.query(
      `select contract 
       from contract
       where created = (
         select max(created)
         from contract
         )`
    );
    const dbResponse = rows[0];

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

const clients = {
  getAgreement,
};

module.exports = clients;
