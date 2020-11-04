const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getAlllabs = async (req, res) => {
  const { tab } = req.query;
  const db = makeDb(configuration, res);

  let $sql;

  try {
    $sql = `select l.created, l.filename
    from lab l
    where l.patient_id=${req.user_id} `;

    if (typeof tab !== "undefined" && tab !== "All") {
      if (tab === "Lab") {
        $sql += `and l.type='l' `;
      } else if (tab === "Imaging") {
        $sql += `and l.type='I' `;
      } else if (tab === "Misc") {
        $sql += `and l.type='M' `;
      } else if (tab === "Uncategorized") {
        $sql += `and l.type is null `;
      }
    }

    $sql += `order by l.created desc limit 200`;

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

const Handouts = {
  getAlllabs,
};

module.exports = Handouts;
