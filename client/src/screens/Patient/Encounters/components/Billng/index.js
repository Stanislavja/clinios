import React, { useState } from "react";

import {
  Box, Button, Grid, Typography, TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import usePatientContext from "../../../../../hooks/usePatientContext";
import HeadingDate from "../HeadingDate";
import LetterHead from "../LetterHead";
import BillingDiagnoses from "./components/BillingDiagnoses";
import BillingPaymentDialog from "./components/BillingPaymentDialog";
import BillingPayment from "./components/BillingPayments";
import BillingProcedures from "./components/BillingProcedures";

const useStyles = makeStyles((theme) => ({
  minWidth100: {
    minWidth: 100,
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  borderSection: {
    border: "1px solid #aaa",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    minHeight: 270,
    position: "relative",
  },
  text: {
    fontSize: 16,
  },
}));

const BillingDialogContent = (props) => {
  const { onClose } = props;
  const classes = useStyles();
  const { state } = usePatientContext();
  const { patientInfo } = state;
  const patientData = patientInfo?.data || {};

  const [showPayment, setShowPayment] = useState(false);

  const togglePaymentDialog = () => {
    setShowPayment((prevState) => !prevState);
  };

  return (
    <>
      <BillingPaymentDialog
        open={showPayment}
        onClose={togglePaymentDialog}
      />
      <Grid
        container
        justify="space-between"
        className={classes.mb2}
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
          onClick={() => togglePaymentDialog()}
        >
          Payment
        </Button>
        <Button
          variant="outlined"
          className={classes.minWidth100}
        >
          Save
        </Button>
      </Grid>
      <Grid className={classes.borderSection}>
        <LetterHead />
        <HeadingDate
          heading="Superbill"
        />

        <Grid container>
          <Grid item md={4}>
            <Typography variant="h4" gutterBottom>Patient Information</Typography>
            <Typography gutterBottom>
              {patientData.firstname}
              {" "}
              {patientData.lastname}
            </Typography>
            <Typography gutterBottom>{patientData.address || "-"}</Typography>
            <Typography gutterBottom>
              {patientData.city}
              {" "}
              {patientData.state}
              {" "}
              {patientData.postal}
            </Typography>
            <Typography gutterBottom>
              DOB
              {patientData.dob}
            </Typography>
            <Typography gutterBottom>
              Phone
              {patientData.phone_cell}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography variant="h4" gutterBottom>Diagnoses</Typography>
            <BillingDiagnoses />
          </Grid>
        </Grid>

        <Box mb={2} mt={2}>
          <BillingProcedures />
        </Box>

        <Box mb={2} mt={2}>
          <Typography variant="h4" gutterBottom>
            Total Amount:
            <span className={classes.text}>$100.00</span>
          </Typography>
        </Box>

        <Box mb={2} mt={2}>
          <Typography variant="h4" gutterBottom>Payment</Typography>
          <BillingPayment />
        </Box>

        <Box mt={5}>
          <TextField value="Mark Hyman" disabled />
          <Typography color="textSecondary" variant="body2">Signature</Typography>
        </Box>
      </Grid>
    </>
  );
};

BillingDialogContent.defaultProps = {
  onClose: () => { },
};

BillingDialogContent.propTypes = {
  onClose: PropTypes.func,
};

export default BillingDialogContent;
