const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getFunctionalRange = async (req, res) => {
  const db = makeDb(configuration, res);
  let $sql;

  try {
    $sql = `select functional_range
    from client
    where id=${req.client_id}`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getPageTitle = async (req, res) => {
  const {cptId} = req.params;
  
  const db = makeDb(configuration, res);
  try {
   const $sql = `select name
    from cpt 
    where id = ${cptId}`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};


const testReport = {
  getFunctionalRange,
  getPageTitle
};

module.exports = testReport;
