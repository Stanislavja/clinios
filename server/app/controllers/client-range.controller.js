const { validationResult } = require("express-validator");
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getClientRanges = async (req, res) => {
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(`select cr.cpt_id, c.name cpt_name, cr.seq, cr.compare_item, cr.compare_operator,
     cr.compare_to, cr.range_low, cr.range_high
    , cr.created, concat(u.firstname, ' ', u.lastname) created_user, cr.updated
    , concat(u2.firstname, ' ', u2.lastname) updated_user from client_range cr
    left join cpt c on c.id=cr.cpt_id
    left join user u on u.id=cr.created_user_id
    left join user u2 on u2.id=cr.updated_user_id
    where cr.client_id=${req.client_id}
    order by c.name, cr.seq
    `);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log("error:", error);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const deleteClientRange = async (req, res) => {
  const {
    cpt_id,
    cpt_name,
    seq,
    compare_item,
    compare_operator,
    compare_to,
  } = req.body.data;
  const db = makeDb(configuration, res);
  try {
    const deleteResponse = await db.query(`
       delete 
        from client_range 
        where client_id=${req.client_id} 
        and cpt_id='${cpt_id}'
        and seq=${seq}
        and compare_item='${compare_item}'
        and compare_operator='${compare_operator}'
        and compare_to='${compare_to}'
    `);

    await db.query(
      `insert into user_log values (${req.client_id}, ${req.user_id}, now(), null, 'Deleted lab range ${cpt_name}')`
    );

    if (!deleteResponse.affectedRows) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const resetClientRange = async (req, res) => {
  const db = makeDb(configuration, res);
  const client_range = req.body.data;
  client_range.created_user_id = req.user_id;
  client_range.client_id = req.client_id;
  client_range.created = new Date();

  try {
    await db.query(`delete from client_range where client_id=${req.client_id}`);
    const insertResponse = await db.query(`insert into client_range
      select ${req.client_id}, cpt_id, seq, compare_item, compare_operator, compare_to, range_low, range_high, now(), ${req.user_id}, now(), ${req.user_id}
      from client_range 
      where client_id=1`);
    await db.query(
      `insert into user_log values (${req.client_id}, ${req.user_id}, now(), null, 'Reset all custom lab ranges')`
    );

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

const getClientRange = async (req, res) => {
  const { cpt_id, seq, compare_item, compare_operator, compare_to } = req.query;
  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(`
      select cr.cpt_id, c.name cpt_name, cr.seq, cr.compare_item, cr.compare_operator, cr.compare_to, cr.range_low, cr.range_high
      , cr.created, concat(u.firstname, ' ', u.lastname) created_user
      , cr.updated, concat(u2.firstname, ' ', u2.lastname) updated_user
      from client_range cr
      left join cpt c on c.id=cr.cpt_id
      left join user u on u.id=cr.created_user_id
      left join user u2 on u2.id=cr.updated_user_id
      where cr.client_id=${req.client_id}
      and cr.cpt_id='${cpt_id}'
      and cr.seq='${seq}'
      and cr.compare_item='${compare_item}'
      and cr.compare_operator='${compare_operator}'
      and cr.compare_to='${compare_to}'
    `);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log("error:", error);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const createClientRange = async (req, res) => {
  const db = makeDb(configuration, res);
  const client_range = req.body.data;
  client_range.created_user_id = req.user_id;
  client_range.client_id = req.client_id;
  client_range.created = new Date();

  try {
    const insertResponse = await db.query(
      "insert into client_range set ?",
      client_range
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

const searchTests = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { text } = req.body.data;

  const db = makeDb(configuration, res);
  try {
    const dbResponse = await db.query(
      `select c.id, c.name, case when cc.cpt_id<>'' then true end favorite, group_concat(ci.cpt2_id) cpt_items
      from cpt c
      left join client_cpt cc on cc.client_id=${req.client_id}
      and cc.cpt_id=c.id
      left join lab_company lc on lc.id=c.lab_company_id
      left join cpt_item ci on ci.cpt_id=c.id
      where c.type='L' /*L=Lab*/
      and c.name like '%${text}%'
      and lc.id is null /*Do not include a test for a specific lab???*/
      group by c.id, c.name, favorite
      having cpt_items is null /*Do not include a group of many lab test*/
      order by c.name
      limit 10`
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Search not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const testReport = {
  getClientRanges,
  deleteClientRange,
  resetClientRange,
  getClientRange,
  createClientRange,
  searchTests,
};

module.exports = testReport;
