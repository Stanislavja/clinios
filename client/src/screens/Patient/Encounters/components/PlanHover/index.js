import React, { useEffect, useState } from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Dialog from "../../../../../components/Dialog";
import NewRequisitions from "../../../Requisitions";
import NewPrescription from "../NewPrescription";

const useStyles = makeStyles(() => ({
  keyText: {
    fontSize: 14,
  },
}));

const PlanHover = (props) => {
  const classes = useStyles();
  const { closePopover } = props;
  const [showNewPrescriptionDialog, setShowNewPrescriptionDialog] = useState(false);
  const [showNewRequisitionDialog, setShowNewRequisitionDialog] = useState(false);

  const toggleNewPrescriptionDialog = () => {
    setShowNewPrescriptionDialog((prevState) => !prevState);
  };

  const toggleNewRequisitionDialog = () => {
    setShowNewRequisitionDialog((prevState) => !prevState);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "KeyP") {
        toggleNewPrescriptionDialog();
      }
      if (event.code === "KeyL") {
        toggleNewRequisitionDialog();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const closePrescriptionDialogWithPopover = () => {
    setShowNewPrescriptionDialog(false);
    closePopover();
  };

  const closeRequisitionDialogWithPopover = () => {
    setShowNewRequisitionDialog(false);
    closePopover();
  };

  return (
    <>
      {!!showNewPrescriptionDialog && (
        <Dialog
          open={showNewPrescriptionDialog}
          title="New Prescription"
          message={<NewPrescription onClose={closePrescriptionDialogWithPopover} />}
          applyForm={() => toggleNewPrescriptionDialog()}
          cancelForm={() => closePrescriptionDialogWithPopover()}
          hideActions
          size="lg"
        />
      )}
      {!!showNewRequisitionDialog && (
        <Dialog
          open={showNewRequisitionDialog}
          title="New Requisition"
          message={<NewRequisitions onClose={closeRequisitionDialogWithPopover} />}
          applyForm={() => toggleNewRequisitionDialog()}
          cancelForm={() => closeRequisitionDialogWithPopover()}
          hideActions
          size="lg"
        />
      )}
      <Typography variant="h5" gutterBottom>
        New Prescription&nbsp;
        <span className={classes.keyText}>
          (P on keyboard)
        </span>
      </Typography>

      <Typography variant="h5" gutterBottom>
        New Lab Requisitions&nbsp;
        <span className={classes.keyText}>
          (L on keyboard)
        </span>
      </Typography>

      <Typography variant="h5" gutterBottom>
        Fax Prescription
      </Typography>

      <Typography variant="h5" gutterBottom>
        Fax Lab Requisitions
      </Typography>
    </>
  );
};

PlanHover.defaultProps = {
  closePopover: () => { },
};

PlanHover.propTypes = {
  closePopover: PropTypes.func,
};

export default PlanHover;
