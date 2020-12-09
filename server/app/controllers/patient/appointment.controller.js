const moment = require("moment");
const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getAllPractitioner = async (req, res) => {
  const db = makeDb(configuration, res);
  let { client_id } = req.query;

  if(typeof client_id === "undefined"){
    client_id = req.client_id
  }
  let $sql;

  try {
    $sql = `select u.id user_id, concat(u.firstname, ' ', u.lastname) name
    from user u
    where u.client_id=${client_id}
    order by name
    limit 100`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.info("err:", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const getAppointmentTypes = async (req, res) => {
  const db = makeDb(configuration, res);

  const { practitioner_id } = req.body.data;

  let $sql;

  try {
    $sql = `select at.appointment_type, at.length
    from appointment_type_user atu
    join appointment_type at on atu.appointment_type_id=at.id
    where atu.client_id=${req.client_id} #add this column to query atu pk (client_id, user_id, appointment_type_id)
    and atu.user_id=${practitioner_id} #use user_id from above Practitioner Name select component
    and at.active=true
    and at.allow_patients_schedule=true
    order by at.sort_order 
    limit 100`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.error = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.info("err:", err);
    errorMessage.error = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const createAppointment = async (req, res) => {
  const { start_dt, end_dt, provider, ApptStatus } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into user_calendar (client_id, user_id, start_dt, end_dt, status, created, created_user_id) values (${
        req.client_id
      }, ${provider.user_id},'${moment(start_dt).format(
        "YYYY-MM-DD HH:mm:ss"
      )}', '${moment(end_dt).format(
        "YYYY-MM-DD HH:mm:ss"
      )}', '${ApptStatus}', now(), ${req.user_id})`
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

const Appointments = {
  getAllPractitioner,
  getAppointmentTypes,
  createAppointment,
};

module.exports = Appointments;
