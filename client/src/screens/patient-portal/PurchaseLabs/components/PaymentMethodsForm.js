import React, { useState } from "react";

import {
  TextField, Button, Grid, Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import MaskInput from "../../../../components/common/MaskInput";
import Dialog from "../../../../components/Dialog";
import useAuth from "../../../../hooks/useAuth";
import PaymentMethodService from "../../../../services/patient_portal/payment-method.service";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: theme.spacing(3, 0),
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  customLabel: {
    fontSize: 16,
    color: "#37474f",
    marginBottom: theme.spacing(2),
  },
  buttonsContainer: {
    margin: theme.spacing(3, 0),
  },
}));

const PaymentMethodsForm = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const {
    isOpen, onClose, reloadData,
  } = props;
  const [formFields, setFormFields] = useState({
    cardType: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });


  const updateFormState = (key, value) => {
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };

  const handleInputChnage = (e) => {
    const { value, name } = e.target;
    updateFormState(name, value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        exp: formFields.expiryDate.replace("/", ""),
        type: formFields.cardType[0] || "V",
        cvc: formFields.cvv,
        account_number: formFields.cardNumber.replaceAll("/", ""),
        stripe_customer_id: user.stripe_customer_id,
        corp_stripe_customer_id: user.corp_stripe_customer_id,
      },
    };
    PaymentMethodService.createPaymentMethod(reqBody).then((response) => {
      enqueueSnackbar(`${response.message}`, { variant: "success" });
      reloadData();
      onClose();
    });
  };

  return (
    <Dialog
      open={isOpen}
      title={" "}
      message={(
        <>
          <Typography variant="h3" color="textSecondary">
            Add Payment Method
          </Typography>
          <form onSubmit={onFormSubmit}>
            <Grid className={classes.formContainer}>
              <Grid>
                <MaskInput
                  required
                  className={classes.gutterBottom}
                  type="text"
                  name="cardNumber"
                  label="Card Number"
                  margin="dense"
                  variant="outlined"
                  value={formFields.cardNumber}
                  mask="9999/9999/9999/9999"
                  onChange={(e) => handleInputChnage(e)}
                />
                {!!formFields.cardType && formFields.cardType.length ? (
                  <Typography gutterBottom>{formFields.cardType}</Typography>
                )
                  : null}
              </Grid>

              <Grid>
                <TextField
                  required
                  variant="outlined"
                  margin="dense"
                  name="cvv"
                  id="cvv"
                  type="number"
                  label="CVV"
                  className={classes.gutterBottom}
                  value={formFields.cvv}
                  onChange={(e) => handleInputChnage(e)}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 3);
                  }}
                />
              </Grid>
              <Grid>
                <MaskInput
                  required
                  className={classes.gutterBottom}
                  type="text"
                  name="expiryDate"
                  label="Validity"
                  margin="dense"
                  variant="outlined"
                  value={formFields.expiryDate}
                  mask="99/99"
                  onChange={(e) => handleInputChnage(e)}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.buttonsContainer} justify="space-between">
              <Button variant="outlined" type="submit">
                Add Method
              </Button>
              <Button variant="outlined" onClick={() => onClose()}>
                Cancel
              </Button>
            </Grid>
          </form>
        </>
      )}
      cancelForm={() => onClose()}
      hideActions
      size="xs"
    />
  );
};

PaymentMethodsForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
};

export default PaymentMethodsForm;
