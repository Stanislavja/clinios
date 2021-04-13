const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
const { configuration, makeDb } = require("../db/db.js");
const { errorMessage, successMessage, status } = require("../helpers/status");


const listOfCustomers = async (req, res) => {
  try {
    const customers = await stripe.customers.list({
      limit: 3,
    });
    successMessage.data = customers;
    successMessage.message = "Update successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Problem on fetching customers";
    return res.status(status.error).send(errorMessage);
  } 
};

const createCustomer = async (req, res) => {
  const {email, name, description} = req.body.data;
  try {
    const customer = await stripe.customers.create({
      email: email,
      name: name,
      description: description
    });
    successMessage.data = customer;
    successMessage.message = "Payment Succesful!";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Problem on creating customers";
    return res.status(status.error).send(errorMessage);
  } 
}

const createPayment = async (req, res) => {
  const {amount, description, payment_method_id} = req.body.data;
  try {
  // Create the PaymentIntent
  let intent = await stripe.paymentIntents.create({
      payment_method: payment_method_id,
      description: description,
      amount: amount,
      currency: 'usd',
      confirmation_method: 'manual',
      confirm: true
    });
    successMessage.data = intent;
    successMessage.message = "Payment Succesful!";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Problem on fetching customers";
    return res.status(status.error).send(errorMessage);
  } 
}

const createPaymentMethod = async (req, res) => {
  const {type, card} = req.body.data;
  try {
    /*
      card: {
        number: '4242424242424242',
        exp_month: 4,
        exp_year: 2022,
        cvc: '314',
      },
    */
    const charge = await stripe.paymentMethods.create({
      type: type,
      card: card,
    });
    successMessage.data = charge;
    successMessage.message = "Payment Succesful!";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Problem on fetching customers";
    return res.status(status.error).send(errorMessage);
  } 
}

const getPaymentMethod = async (req, res) => {
  const {type, card} = req.body.data;
  try {
    const charge = await stripe.paymentMethods.create({
      type: type,
      card: card,
    });
    successMessage.data = charge;
    successMessage.message = "Payment Succesful!";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Problem on fetching customers";
    return res.status(status.error).send(errorMessage);
  } 
}

const users = {
  listOfCustomers,
  createCustomer,
  createPayment,
  createPaymentMethod,
  getPaymentMethod
};

module.exports = users;
