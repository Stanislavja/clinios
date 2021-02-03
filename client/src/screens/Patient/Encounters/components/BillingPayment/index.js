import React from "react";

import {
  Box, Typography, Grid, Button, TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Dialog from "../../../../../components/Dialog";

const useStyles = makeStyles(() => ({
  minWidth100: {
    minWidth: 100,
  },
}));

const BillingPayment = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();

  const onFormSubmit = (e) => {
    e.preventDefault();
    /* payment submission logic goes here */
    e.stopPropagation(); // to prevent encounters main form submission
  };

  return (
    <Dialog
      open={open}
      message={(
        <form
          onSubmit={onFormSubmit}
          id="payments-form"
        >
          <Typography variant="h3">
            Process Payment
          </Typography>

          <Box mt={3}>
            <Typography
              variant="h5"
              gutterBottom
            >
              Use existing payment method
            </Typography>
            <Typography gutterBottom>Visa 0043</Typography>
            <Typography gutterBottom>Master Card 0222</Typography>
            <Typography gutterBottom>Checking 0111</Typography>
          </Box>

          <Box mb={3} mt={3}>
            <Typography
              variant="h5"
              color="textSecondary"
              gutterBottom
            >
              New Payment method
            </Typography>
            <TextField
              required
              type="number"
              margin="dense"
              variant="outlined"
              label="Amount"
              className={classes.minWidth100}
            />
          </Box>

          <Grid
            container
            justify="space-between"
          >
            <Button
              variant="outlined"
              className={classes.minWidth100}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              className={classes.minWidth100}
              type="submit"
              form="payments-form"
            >
              Process Payment
            </Button>
          </Grid>
        </form>
      )}
      cancelForm={onClose}
      hideActions
      size="xs"
    />
  );
};

BillingPayment.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default BillingPayment;
