import React, { useState } from "react";

import { Typography, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../../components/Alert";
import usePatientContext from "../../../../hooks/usePatientContext";
import { toggleNewTransactionDialog, setSelectedBilling } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";

const useStyles = makeStyles(() => ({
  newButton: {
    position: "absolute",
    right: "20%",
    top: "10px",
  },
  tableContainer: {
    minWidth: 650,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "12px",
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontSize: 14,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& th": {
      fontSize: 12,
    },
    "& td": {
      fontSize: 12,
      height: "50px",
    },
  },
}))(TableRow);

const BillingDetails = (props) => {
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

  const editBillingHandler = (item) => {
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
      <Button
        variant="outlined"
        className={classes.newButton}
        onClick={() => dispatch(toggleNewTransactionDialog())}
      >
        New
      </Button>
      <TableContainer className={classes.tableContainer}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Transaction Type</StyledTableCell>
              <StyledTableCell>Encounter Title</StyledTableCell>
              <StyledTableCell>Notes</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length
              ? data.map((item) => (
                <StyledTableRow key={`${item.id}_${item.dt}`}>
                  <TableCell component="th" scope="item">
                    {moment(item.dt).format("MMM D YYYY")}
                  </TableCell>
                  <TableCell>
                    $
                    {item.amount}
                  </TableCell>
                  <TableCell>{item.tran_type}</TableCell>
                  <TableCell>{item.encounter_title}</TableCell>
                  <TableCell>{item.note || ""}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => editBillingHandler(item)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      disabled={(item.payment_type === "C" || item.payment_type === "A")}
                      onClick={() => openDeleteDialog(item)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
              : (
                <StyledTableRow>
                  <TableCell colSpan={6}>
                    <Typography align="center" variant="body1">
                      No Records Found...
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

BillingDetails.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default BillingDetails;
