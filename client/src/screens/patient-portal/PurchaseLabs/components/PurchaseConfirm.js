import React from "react";

import { Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Link,
} from "react-router-dom";

const useStyles = makeStyles((theme) => createStyles({
  titleContainer: {
    minHeight: 50,
    backgroundColor: theme.palette.primary.main,
    "& h5": {
      color: theme.palette.common.white,
    },
  },
  content: {
    padding: "1rem 1.5rem",
  },
  actionsContainer: {
    padding: "1rem 1.5rem",
    justifyContent: "space-between",
  },
  w100: {
    minWidth: 100,
  },
}));

const PurchaseConfirm = ({
  open,
  onClose,
  onConfirmation,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle disableTypography className={classes.titleContainer} id="form-dialog-title">
        <Typography variant="h5">Purchase confirmation</Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Typography variant="h6">This is a confirmation that you have purchased labs for 10</Typography>
        <Typography variant="h6">
          Next step is to
          <Link to="/patient/labs-requisition">click here</Link>
          {" "}
          to print your test requisition.
        </Typography>
      </DialogContent>
      <DialogActions classes={{ root: classes.actionsContainer }}>
        <Button
          className={classes.w100}
          onClick={onClose}
          type="submit"
          variant="outlined"
          disableElevation
        >
          Cancel
        </Button>
        <Button
          className={classes.w100}
          onClick={onConfirmation}
          type="submit"
          variant="outlined"
          color="primary"
          disableElevation
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PurchaseConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmation: PropTypes.func.isRequired,
};

export default PurchaseConfirm;
