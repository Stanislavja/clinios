import React, { useState } from "react";

import {
  Box, Button, Grid, Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import PropTypes from "prop-types";

import UltraWellnessLogo from "../../../../../assets/client/c1_logo.png";
import usePatientContext from "../../../../../hooks/usePatientContext";
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

  const BillingIntro = () => (
    <>
      <Typography gutterBottom>UltraWellness Center</Typography>
      <Typography gutterBottom>Mark Hyman MD</Typography>
      <Typography gutterBottom>55 PittsField Rd # 9</Typography>
      <Typography gutterBottom>DEA #A 123456789</Typography>
      <Typography gutterBottom>NPI # 123456789</Typography>
      <Typography gutterBottom>Lenox, MA 01240</Typography>
      <Typography gutterBottom>Phone (413) 637-9991</Typography>
      <Typography gutterBottom>Fax (413) 637-9991</Typography>
    </>
  );

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
        <Grid container justify="space-between">
          <Grid item md={4}>
            <img
              alt="ultrawellness-logo"
              src={UltraWellnessLogo}
            />
          </Grid>
          <Grid item md={2}>
            <BillingIntro />
          </Grid>
        </Grid>

        <Grid
          container
          justify="space-between"
          alignItems="center"
          component={Box}
          mt={2}
          mb={2}
        >
          <Grid item md={4}>
            <Typography variant="h3">Superbill</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography>
              Date:
              {moment().format("MMM D YYYY")}
            </Typography>
          </Grid>
        </Grid>

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
          <Typography variant="h4" gutterBottom>Total Amount</Typography>
        </Box>

        <Box mb={5} mt={2}>
          <BillingPayment />
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
