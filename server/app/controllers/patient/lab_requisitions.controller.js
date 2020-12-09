const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getLabRequitions = async (req, res) => {
  const db = makeDb(configuration, res);
  let { patient_id } = req.query;

  if(typeof patient_id === "undefined"){
    patient_id = req.user_id
  }
  let $sql;
  try {
    $sql = `select e.id, e.dt, left (group_concat(c.name order by c.name), 100) lab
    from encounter e
    join patient_cpt pc on pc.encounter_id=e.id
    join cpt c on c.id=pc.cpt_id
    where pc.patient_id=${patient_id}
    group by e.id
    order by e.id desc
    limit 50`;

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

const labRequitions = {
  getLabRequitions,
};

module.exports = labRequitions;
