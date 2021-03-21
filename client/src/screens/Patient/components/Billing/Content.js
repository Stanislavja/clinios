import React, { useState } from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";


import Alert from "../../../../components/Alert";
import usePatientContext from "../../../../hooks/usePatientContext";
import { toggleNewTransactionDialog, setSelectedBilling } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";

const useStyles = makeStyles((theme) => ({
  text12: {
    fontSize: 12,
  },
  block: {
    width: 80,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
  blockAction: {
    width: 65,
    textAlign: "right",
    padding: theme.spacing(0, 0.5, 0, 0),
    "& svg": {
      fontSize: "1rem",
      cursor: "pointer",
    },
  },
  mr2: {
    marginRight: 5,
  },
}));


const BillingContent = (props) => {
  const classes = useStyles();
  const { reloadData } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { state, dispatch } = usePatientContext();
  const { patientId } = state;
  const { data } = state.billing;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openDeleteDialog = (item) => {
    setSelectedItem(item);
    setShowDeleteDialog((prevstate) => !prevstate);
  };

  const closeDeleteDialog = () => {
    setSelectedItem(null);
    setShowDeleteDialog((prevstate) => !prevstate);
  };

  const editItemHandler = (item) => {
    dispatch(setSelectedBilling(item));
    dispatch(toggleNewTransactionDialog());
  };

  const deleteItemHandler = (item) => {
    const billingId = item.id;
    PatientService.deleteBilling(patientId, billingId)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        closeDeleteDialog();
        reloadData();
      });
  };

  return (
    <>
      <Alert
        open={showDeleteDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this billing?"
        applyButtonText="Delete"
        cancelButtonText="Cancel"
        applyForm={() => deleteItemHandler(selectedItem)}
        cancelForm={closeDeleteDialog}
      />
      {data.map((item) => (
        <Grid
          key={`${item.id}_${item.dt}`}
          container
          className={classes.inputRow}
        >
          <Grid item className={classes.block}>
            <Typography
              component="span"
              className={classes.text12}
              color="textPrimary"
            >
              {moment(item.dt).format("MMM D YYYY")}
            </Typography>
          </Grid>
          <Grid item className={classes.block}>
            <Typography
              component="span"
              className={classes.text12}
              color="textPrimary"
            >
              $
              {item.amount}
            </Typography>
          </Grid>
          <Grid item className={classes.block}>
            <Typography
              component="span"
              className={classes.text12}
              color="textPrimary"
            >
              {item.tran_type}
            </Typography>
          </Grid>
          <Grid item className={classes.block}>
            <Typography
              component="span"
              className={classes.text12}
              color="textPrimary"
            >
              {item.encounter_title}
            </Typography>
          </Grid>
          {!!item.cpt_procedure && (
            <Grid item className={classes.block}>
              <Typography
                component="span"
                className={classes.text12}
                color="textPrimary"
              >
                {item.cpt_procedure}
              </Typography>
            </Grid>
          )}
          <Grid item className={classes.blockAction}>
            <EditIcon
              onClick={() => editItemHandler(item)}
              className={classes.mr2}
            />
            <DeleteIcon
              onClick={() => openDeleteDialog(item)}
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

BillingContent.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default BillingContent;
