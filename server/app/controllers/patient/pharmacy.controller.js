const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getPharmacy = async (req, res) => {
  const db = makeDb(configuration, res);
  let { patient_id } = req.query;

  if(typeof patient_id === "undefined"){
    patient_id = req.user_id
  }

  let $sql;

  try {
    $sql = `select p.id, p.firstname, p.middlename, p.lastname, p.gender, p.dob, p.ssn, p.preferred_name, p.referred_by, p.phone_home, p.phone_cell, p.phone_work, p.email, p.client_id
    , ph.id, ph.name, ph.address, ph.address2, ph.city, ph.state, ph.postal, ph.country, ph.phone, ph.fax
    , ph2.id, ph2.name, ph2.address, ph2.address2, ph2.city, ph2.state, ph2.postal, ph2.country, ph2.phone, ph2.fax
    from patient p
    left join pharmacy ph on ph.id=p.pharmacy_id
    left join pharmacy ph2 on ph2.id=p.pharmacy2_id
    where p.id=${patient_id}`;

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

const searchPharmacy = async (req, res) => {
  const { text } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select id, name
      from pharmacy
      where name like '${text}%'
      order by name
      limit 20
      `
    );

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.error = "Search not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const Pharmacy = {
  getPharmacy,
  searchPharmacy,
};

module.exports = Pharmacy;
