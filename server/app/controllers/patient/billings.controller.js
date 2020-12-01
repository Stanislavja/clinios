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

const Billing = {
  getBillings,
};

module.exports = Billing;
