const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getPurchaseLabs = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const $sql = `select c.id, c.name cpt_name, c.price, pc.created, lc.name lab_company_name
    from patient_cpt pc
    left join cpt c on c.id=pc.cpt_id
    left join lab_company lc on lc.id=c.lab_company_id
    where pc.patient_id=${req.user_id}
    and pc.completed_dt is null
    order by c.name
    limit 100`;

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

const PurchaseLabs = {
  getPurchaseLabs,
};

module.exports = PurchaseLabs;
