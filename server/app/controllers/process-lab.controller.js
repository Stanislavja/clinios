const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getLabById = async (req, res) => {
  const db = makeDb(configuration, res);
  const { labId } = req.params;

  try {
    const dbResponse = await db.query(
      `select l.id, l.filename, l.created, l.status, lab_dt, l.source, lc.name lab_company, concat(p.firstname, ' ', p.lastname) patient_name, l.type, l.note, l.user_id assigned_to, l.note_assign, l.client_id
      from lab l
      left join lab_company lc on lc.id=l.lab_company_id
      left join patient p on p.id=l.patient_id
      where l.id=${labId}`
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

const getAll = async (req, res) => {
  const db = makeDb(configuration, res);
  const { userId } = req.params;

  try {
    const dbResponse = await db.query(
      `select l.id, l.filename, l.created, l.status, lab_dt, l.source, lc.name lab_company, concat(p.firstname, ' ', p.lastname) patient_name, l.type, l.note, l.user_id assigned_to, l.note_assign, l.client_id
        from lab l
        left join lab_company lc on lc.id=l.lab_company_id
        left join patient p on p.id=l.patient_id
        where l.user_id = ${userId}
        and l.status = 'R'
        order by l.created
        limit 1`
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

const processLab = {
  getAll,
  getLabById,
};

module.exports = processLab;
