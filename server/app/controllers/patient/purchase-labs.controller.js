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

// TODO: incomplete and waiting for further instruction on CLIN-80
const createPurchaseLabs = async (req, res) => {
  const formData = req.body.data;
  const trancData = {
    client_id: req.client_id,
    patient_id: req.user_id,
    type_id: 1,
    dt:  new Date(),
    created:  new Date(),
    amount: formData.amount,
    payment_method_id: formData.payment_method_id
  }

  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(`insert into tranc set ?`, [
      trancData,
    ]);

    if (!insertResponse.affectedRows) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    if (insertResponse.insertId) {
        const trancDetailsData = {
          tranc_id: insertResponse.insertId,
          cpt_id: formData.cpt_ids
        }
        if(formData.cpt_ids.length > 0) {
          formData.cpt_ids.map(async (cpt_id)=> {
            trancDetailsData.cpt_id = cpt_id;
             await db.query(`insert into tranc_detail set ?`, [
              trancDetailsData,
            ]);
        
          })
        }
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

const PurchaseLabs = {
  getPurchaseLabs,
  createPurchaseLabs,
};

module.exports = PurchaseLabs;
