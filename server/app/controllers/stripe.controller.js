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
  const customer = await stripe.customers.create({
    description: 'My First Test Customer (created for API docs)',
  });
  console.log('customer:', customer)
}

const createPayment = async (req, res) => {
  const {amount, description} = req.body.data;
  try {
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      source: 'tok_mastercard',
      description: description,
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
  createPayment
};

module.exports = users;
