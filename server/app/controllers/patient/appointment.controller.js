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

  if (typeof client_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    client_id = req.client_id;
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
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.info("err:", err);
    errorMessage.message = "Select not successful";
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
    $sql = `select at.id, at.appointment_type, at.descr, at.length, at.fee
    from appointment_type at 
    where at.client_id=${req.client_id} 
    /*and atu.user_id=${practitioner_id}*/
    and at.active=true
    and at.allow_patients_schedule=true
    order by at.sort_order 
    limit 100
    `;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.info("err:", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const createAppointment = async (req, res) => {
  const {
    start_dt,
    end_dt,
    provider,
    ApptStatus,
    patient,
    reschedule,
    appointment_type_id,
  } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const insertResponse = await db.query(
      `insert into user_calendar (client_id, user_id, patient_id, appointment_type_id, start_dt, end_dt, status, reschedule, created, created_user_id) values (${
        req.client_id
      }, ${provider.user_id}, ${patient.id}, ${appointment_type_id}, '${moment(
        start_dt,
        "YYYY-MM-DD HH:mm:ss"
      ).format("YYYY-MM-DD HH:mm:ss")}', '${moment(
        end_dt,
        "YYYY-MM-DD HH:mm:ss"
      ).format(
        "YYYY-MM-DD HH:mm:ss"
      )}', '${ApptStatus}', ${reschedule}, now(), ${req.user_id})`
    );
    if (!insertResponse.affectedRows) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
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

const updateAppointment = async (req, res) => {
  const {
    start_dt,
    end_dt,
    provider,
    ApptStatus,
    patient,
    reschedule,
    appointment_type_id,
  } = req.body.data;
  const appointmentId = req.params.id;

  const db = makeDb(configuration, res);
  try {
    let $sql = `update user_calendar
    set status='${ApptStatus}'`;

    if (req.client_id && req.client_id !== undefined) {
      $sql += `, client_id='${req.client_id}'`;
    }
    if (provider && provider.user_id) {
      $sql += `, user_id=${provider.user_id}`;
    }
    if (patient && patient.id) {
      $sql += `, patient_id=${patient.id}`;
    }
    if (appointment_type_id) {
      $sql += `, appointment_type_id=${appointment_type_id}`;
    }
    if (start_dt) {
      $sql += `, start_dt='${start_dt}}'`;
    }
    if (end_dt) {
      $sql += `, end_dt='${end_dt}'`;
    }
    if (reschedule) {
      $sql += `, reschedule=${reschedule}`;
    }
    $sql += `, updated=now(), updated_user_id=${req.user_id}
    where id=${appointmentId}`;

    const updateResponse = await db.query($sql);
    if (!updateResponse.affectedRows) {
      errorMessage.message = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = updateResponse;
    successMessage.message = "Update successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Update not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const Appointments = {
  getAllPractitioner,
  getAppointmentTypes,
  createAppointment,
  updateAppointment,
};

module.exports = Appointments;
