const Stripe = require("stripe");
const { configuration, makeDb } = require("../../db/db.js");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getPaymentMethods = async (req, res) => {
  const db = makeDb(configuration, res);
  let { patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    patient_id = req.user_id;
  }

  let $sql;
  try {
    $sql = `select id, patient_id, type, account_number, exp, status, stripe_payment_method_token, client_id, created, created_user_id, updated, updated_user_id
    from payment_method
    where patient_id=${patient_id}
    and (status is null or status <> 'D')
    order by id
    `;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const createPaymentMethod = async (req, res) => {
  let { patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    patient_id = req.user_id;
  }
  // const { type, account_number, exp } = req.body.data;
  const formData = req.body.data;
  formData.client_id = req.client_id;
  formData.created_user_id = req.user_id;
  formData.patient_id = patient_id;
  formData.created = new Date();

  const db = makeDb(configuration, res);
  const $sql = `select p.id, c.name, c.stripe_api_key from patient p
  left join client c on c.id=p.client_id
  where p.id=${patient_id}`;

  const getStripeResponse = await db.query($sql);
  try {
    const stripe = Stripe(getStripeResponse[0].stripe_api_key);
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: formData.account_number,
        exp_month: formData.exp.substring(0, 2),
        exp_year: formData.exp.substring(2, 4),
        cvc: formData.cvc,
      },
    });

    formData.stripe_payment_method_token = paymentMethod.id;
    formData.account_number = formData.account_number.substring(0, 4);

    // Attach payment method to a customer
    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: formData.customer_id,
    });

    delete formData.customer_id; // Delete customer_id as it's not on payment_method table
    delete formData.cvc; // Delete cvc as it's not on payment_method table
    const insertResponse = await db.query("insert into payment_method set ? ", [
      formData,
    ]);

    if (!insertResponse.affectedRows) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = err.message;
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const updatePaymentMethod = async (req, res) => {
  const { patient_id, id } = req.params;
  const { type, account_number, exp } = req.body.data;
  const db = makeDb(configuration, res);
  try {
    const $sql = `update payment_method set type='${type}', account_number=${account_number}, exp='${exp}',
    updated= now(), updated_user_id='${req.user_id}' where patient_id=${patient_id} and id='${id}'`;

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


const deletePaymentMethod = async (req, res) => {
  const db = makeDb(configuration, res);
  const { id } = req.params;

  try {
    const dbResponse = await db.query(
      `delete from payment_method where id=${id} and patient_id=${req.user_id}`
    );
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Error deleting payment method";
    return res.status(status.error).send(errorMessage);
  } finally {
    await db.close();
  }
};

const PaymentMethod = {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
};

module.exports = PaymentMethod;
