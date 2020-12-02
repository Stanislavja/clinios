const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getBillings = async (req, res) => {
  const db = makeDb(configuration, res);

  let $sql;
  try {
    $sql = `select t.encounter_id, t.dt, tt.name tran_type, t.payment_type, pm.account_number
    , case when t.type_id=1 then et.name end encounter_type, t.amount
    from tran t
    left join tran_type tt on tt.id=t.type_id
    left join encounter e on e.id=t.encounter_id
    left join encounter_type et on et.id=e.type_id
    left join payment_method pm on pm.id=t.payment_method_id
    where t.patient_id=${req.user_id}
    order by t.dt desc
    limit 100`;

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

const createBilling = async (req, res) => {
  const { patient_id } = req.params;
  const { dt, type_id, amount, note } = req.body.data;
  let { payment_type } = req.body.data;

  const db = makeDb(configuration, res);

  if (!payment_type) {
    payment_type = null;
  } else {
    payment_type = `'${payment_type}'`;
  }
  try {
    const insertResponse = await db.query(
      `insert into tran (patient_id, user_id, client_id, dt, type_id, amount, payment_type, note, created, created_user_id) values 
        (${req.client_id}, ${req.user_id}, ${req.client_id}, '${dt}', ${type_id}, ${amount}, ${payment_type}, '${note}', now(), ${req.user_id})`
    );

    if (!insertResponse.affectedRows) {
      errorMessage.error = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const Billing = {
  getBillings,
  createBilling
};

module.exports = Billing;
