const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const deleteClientRange = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const deleteResponse = await db.query(`
       delete 
        from client_range 
        where client_id=${req.client_id}
    `);

    if (!deleteResponse.affectedRows) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};


const testReport = {
  deleteClientRange
};

module.exports = testReport;
