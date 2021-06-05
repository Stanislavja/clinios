const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getBillings = async (req, res) => {
  const db = makeDb(configuration, res);
  let { patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    patient_id = req.user_id;
  }
  let $sql;
  try {
    $sql = `select t.encounter_id, t.dt, tt.name tran_type, pm.type payment_type, pm.account_number, t.amount
    from tran t
    left join tran_type tt on tt.id=t.type_id
    left join payment_method pm on pm.id=t.payment_method_id
    /*left join encounter e on e.id=t.encounter_id
    left join encounter_type et on et.id=e.type_id*/
    where t.patient_id=?
    order by t.dt desc
    limit 100
    `;

    const dbResponse = await db.query($sql, [patient_id]);

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

const getBalance = async (req, res) => {
  const db = makeDb(configuration, res);
  let { patient_id } = req.query;
  if (typeof patient_id === "undefined") {
    patient_id = req.user_id;
  }
  try {
    const dbResponse = await db.query(
      `select sum(t.amount) amount
       from tran t
       where t.patient_id=?
      `, [patient_id]
    );

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

const createBilling = async (req, res) => {
  const db = makeDb(configuration, res);
  const formData = req.body.data;
  formData.client_id = formData.client_id ? formData.client_id : req.client_id; 
  formData.patient_id = formData.patient_id ? formData.patient_id : req.user_id;
  formData.created = new Date();
  formData.created_user_id = req.user_id;

  try {
    const insertResponse = await db.query(`insert into tran set ?`, [formData]);

    if (!insertResponse.affectedRows) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const Billing = {
  getBillings,
  createBilling,
  getBalance,
};

module.exports = Billing;
