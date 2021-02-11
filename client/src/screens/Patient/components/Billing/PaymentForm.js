import React, { useState } from "react";

import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import usePatientContext from "../../../../hooks/usePatientContext";
import { togglePaymentDialog } from "../../../../providers/Patient/actions";
import { paymentMethodType } from "../../../../utils/helpers";
import PaymentMethodsForm from "../BasicInfo/components/PaymentMethodsForm";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  amountContainer: {
    marginLeft: "0px !important",
  },
  formInput: {
    marginBottom: theme.spacing(1),
  },
  textButton: {
    cursor: "pointer",
    padding: "3px 0px",
    "&:hover": {
      backgroundColor: "#f1f1f1 !important",
    },
  },
}));

const PaymentForm = () => {
  const classes = useStyles();
  const { state, dispatch } = usePatientContext();
  const paymentMethodsData = state.patientInfo.paymentMethods || [];

  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false);

  const processPaymentHandler = () => {
    dispatch(togglePaymentDialog());
  };

  const toggleNewPaymentMethodDialog = () => {
    setShowPaymentMethodForm((prevState) => !prevState);
  };

  return (
    <>
      <PaymentMethodsForm
        isOpen={showPaymentMethodForm}
        onClose={toggleNewPaymentMethodDialog}
        reloadData={() => { }}
        cardData={null}
      />
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
          <Grid item lg={6}>
            <List component="ul">
              {
                paymentMethodsData.length
                  ? paymentMethodsData.map((item) => (
                    <ListItem
                      key={item.id}
                      disableGutters
                      button
                    >
                      <ListItemText primary={`${paymentMethodType(item.type)} ${item.account_number}`} />
                    </ListItem>
                  ))
                  : (
                    <Typography
                      className={classes.formInput}
                      variant="h5"
                      color="textPrimary"
                      gutterBottom
                    >
                      No payment methods available...
                    </Typography>
                  )
              }
            </List>

            <Box mb={3} mt={1}>
              <Typography
                variant="h5"
                color="textPrimary"
                gutterBottom
                className={classes.textButton}
                onClick={() => toggleNewPaymentMethodDialog()}
              >
                New Payment method
              </Typography>
              <TextField
                required
                type="number"
                margin="dense"
                variant="outlined"
                label="Amount"
              />
            </Box>
          </Grid>

          <Button
            onClick={() => processPaymentHandler()}
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
