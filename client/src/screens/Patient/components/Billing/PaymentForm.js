import React from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import usePatientContext from "../../../../hooks/usePatientContext";
import { togglePaymentDialog } from "../../../../providers/Patient/actions";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  processPaymentButton: {
    margin: theme.spacing(3, 0),
  },
  amountContainer: {
    marginLeft: "0px !important",
  },
  formInput: {
    marginBottom: theme.spacing(1),
  },
}));

const PaymentForm = () => {
  const classes = useStyles();
  const { dispatch } = usePatientContext();

  const processPaymentHandler = () => {
    dispatch(togglePaymentDialog());
  };

  return (
    <>
      <Typography variant="h3" color="textSecondary" gutterBottom>
        Process Payment
      </Typography>
      <form>
        <Grid className={classes.inputRow}>
          <Typography
            className={classes.formInput}
            variant="h4"
            color="textPrimary"
            gutterBottom
          >
            Use existing payment method
          </Typography>
          <Typography
            className={classes.formInput}
            variant="h5"
            color="textPrimary"
            gutterBottom
          >
            Visa 0043
          </Typography>
          <Typography
            className={classes.formInput}
            variant="h5"
            color="textPrimary"
            gutterBottom
          >
            MasterCard 0222
          </Typography>
          <Typography
            className={classes.formInput}
            variant="h5"
            color="textPrimary"
            gutterBottom
          >
            Checking 0111
          </Typography>

          <Typography variant="h5" color="textPrimary" gutterBottom>
            New Payment Method
          </Typography>

          <Grid>
            <FormControlLabel
              className={classes.amountContainer}
              value=""
              control={<TextField label="" name="address" />}
              label="Amount"
              labelPlacement="start"
            />
          </Grid>

          <Button
            onClick={() => processPaymentHandler()}
            className={classes.processPaymentButton}
            variant="outlined"
            size="large"
          >
            Process Payment
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default PaymentForm;
