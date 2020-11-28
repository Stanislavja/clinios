import React, { useState, useEffect, useCallback } from "react";

import { Button, makeStyles, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import NewTransactionForm from "./NewTransactionForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  btnContainer: {
    margin: theme.spacing(1, 0),
  },
  btn: {
    minWidth: 120,
  },
}));

const StyledTableCell = withStyles(() => ({
  head: {
    whiteSpace: "nowrap",
    fontSize: "12px",
    fontWeight: 700,
    padding: "6px 24px 6px 2px",
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    fontSize: 14,
    "& th": {
      fontSize: 12,
      whiteSpace: "nowrap",
      padding: "2px 16px 2px 2px",
      lineHeight: "14px",
    },
    "& td": {
      fontSize: 12,
      whiteSpace: "nowrap",
      padding: "2px 16px 2px 2px",
      lineHeight: "14px",
    },
  },
}))(TableRow);

const PaymentMethods = () => {
  const classes = useStyles();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPaymentDialog, setNewPaymentDialog] = useState(false);

  const fetchPaymentMethods = useCallback(() => {
    PatientPortalService.getPaymentMethods().then((res) => {
      setPaymentMethods(res.data);
    });
  }, []);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  return (
    <>
      {!!newPaymentDialog && (
        <NewTransactionForm
          isOpen={newPaymentDialog}
          onClose={() => setNewPaymentDialog(false)}
        />
      )}
      <div className={classes.root}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.title}
        >
          Payment Methods
        </Typography>
        <Typography
          variant="h5"
          color="textPrimary"
          className={classes.title}
        >
          This page is used to manage credit cards or bank accounts used to pay invoices.
        </Typography>
        <Grid
          container
          className={classes.btnContainer}
        >
          <Button
            variant="outlined"
            className={classes.btn}
            onClick={() => setNewPaymentDialog(true)}
          >
            New
          </Button>
        </Grid>
        <TableContainer className={classes.tableContainer}>
          <Table size="small" className={classes.table}>
            <TableBody>
              {paymentMethods.length ? (
                paymentMethods.map((item) => (
                  <StyledTableRow key={`${item.created}_${item.filename}`}>
                    <StyledTableCell component="th" scope="item">
                      {moment(item.created).format("MMM D YYYY")}
                    </StyledTableCell>
                    <StyledTableCell>{item.filename}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={2}>
                    <Typography className={classes.resMessage}>
                      No Payment Methods Found...
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default PaymentMethods;
