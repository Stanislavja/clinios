"use strict";
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getInit = async (req, res) => {
  const db = makeDb(configuration, res);
  const { cStatus } = req.query;
  let $sql;

  try {
    $sql = `select s.id, c.name, s.status_id, s.subject, cs.name, s.created, concat(u.firstname, ' ', u.lastname) created_user, s.updated, s.client_id
      from support s
      left join client c on c.id=s.client_id
      left join case_status cs on cs.id=s.status_id
      left join user u on u.id=s.created_user_id
      where s.client_id=${req.client_id} \n`;
    if (!!cStatus) {
      $sql = $sql + `and s.status_id in ('WD', 'WC') \n`;
    }
    $sql = $sql + `order by s.created desc \n`;
    $sql = $sql + `limit 100 \n`;

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

const getStatus = async (req, res) => {
  const db = makeDb(configuration, res);
  let $sql;

  try {
    $sql = `select id, name
      from case_status
      order by id
      limit 10 \n`;

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

const Support = {
  getInit,
  getStatus,
};

module.exports = Support;
