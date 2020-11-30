import React, { useState, useEffect, useCallback } from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import NewTransactionForm from "../PaymentMethods/NewTransactionForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
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

const Billing = () => {
  const classes = useStyles();
  const [billings, setBillings] = useState([]);
  const [newPaymentDialog, setNewPaymentDialog] = useState(false);

  const fetchBillings = useCallback(() => {
    PatientPortalService.getBillings().then((res) => {
      setBillings(res.data);
    });
  }, []);

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  return (
    <>
      {!!newPaymentDialog && (
        <NewTransactionForm
          isOpen={newPaymentDialog}
          onClose={() => setNewPaymentDialog(false)}
        />
      )}
      <div className={classes.root}>
        <Grid
          item
          sm={6}
          xs={12}
        >
          <Grid
            container
            justify="space-between"
          >
            <Typography
              component="h1"
              variant="h2"
              color="textPrimary"
              className={classes.title}
            >
              Billing
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setNewPaymentDialog(true)}
            >
              Make Payment
            </Button>
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          color="textPrimary"
          className={classes.title}
        >
          This page is used to view billings.
        </Typography>

        <Grid item md={6} sm={12} xs={12}>
          <TableContainer className={classes.tableContainer}>
            <Table size="small" className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Transaction Type</StyledTableCell>
                  <StyledTableCell>Payment Type</StyledTableCell>
                  <StyledTableCell>Account Number</StyledTableCell>
                  <StyledTableCell>Encounter Type</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Invoice/Receipt</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billings.length ? (
                  billings.map((item) => (
                    <StyledTableRow key={`${item.dt}_${item.amount}_${item.tran_type}`}>
                      <StyledTableCell component="th" scope="item">
                        {moment(item.dt).format("MMM D YYYY")}
                      </StyledTableCell>
                      <StyledTableCell>{item.tran_type}</StyledTableCell>
                      <StyledTableCell>{item.cpt_procedure}</StyledTableCell>
                      <StyledTableCell>{item.account_num}</StyledTableCell>
                      <StyledTableCell>{item.encounter_title}</StyledTableCell>
                      <StyledTableCell>
                        $
                        {item.amount}
                      </StyledTableCell>
                      <StyledTableCell>{item.filename}</StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={2}>
                      <Typography className={classes.resMessage}>
                        No Billings Found...
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </div>
    </>
  );
};

export default Billing;
