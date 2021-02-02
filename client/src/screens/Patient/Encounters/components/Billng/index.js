import React, { useState } from "react";

import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import BillingPaymentDialog from "../BillingPayment";
import SampleDocViewer from "../SampleDocViewer";

const useStyles = makeStyles(() => ({
  minWidth100: {
    minWidth: 100,
  },
}));

const BillingDialogContent = (props) => {
  const { onClose } = props;
  const classes = useStyles();

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
      <SampleDocViewer />
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
