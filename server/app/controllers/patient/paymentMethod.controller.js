const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getPaymentMethods = async (req, res) => {
  const db = makeDb(configuration, res);

  let $sql;
  try {
    $sql = `select * ?
    from patient_card
    where patient_id=${req.user_id}
    order by id`;

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

const PaymentMethod = {
  getPaymentMethods,
};

module.exports = PaymentMethod;