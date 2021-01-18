import React from "react";

import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import SampleDocViewer from "../SampleDocViewer";

const useStyles = makeStyles(() => ({
  minWidth100: {
    minWidth: 100,
  },
}));

const BillingDialogContent = (props) => {
  const { onClose } = props;
  const classes = useStyles();

  return (
    <>
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
