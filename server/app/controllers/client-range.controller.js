const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getClientRanges = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(`select cr.cpt_id, c.name cpt_name, cr.seq, cr.compare_item, cr.compare_operator,
     cr.compare_to, cr.range_low, cr.range_high
    , cr.created, concat(u.firstname, ' ', u.lastname) created_user, cr.updated
    , concat(u2.firstname, ' ', u2.lastname) updated_user from client_range cr
    left join cpt c on c.id=cr.cpt_id
    left join user u on u.id=cr.created_user_id
    left join user u2 on u2.id=cr.updated_user_id
    where cr.client_id=${req.client_id}
    order by 1,2,3,4`);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log('error:', error)
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

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

const createClientRange = async (req, res) => {
  const db = makeDb(configuration, res);
  const client_range = req.body.data;
  client_range.created_user_id = req.user_id;
  client_range.client_id = req.client_id;
  client_range.created = new Date();

  try {
    const insertResponse = await db.query(
      "insert into client_range set ?",
      client_range
    );

    if (!insertResponse.affectedRows) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};


const testReport = {
  getClientRanges,
  deleteClientRange,
  createClientRange,
};

module.exports = testReport;
