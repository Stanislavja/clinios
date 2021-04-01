import React, { useCallback, useState, useEffect } from "react";

import {
  makeStyles, Typography, Grid,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import useAuth from "../../../hooks/useAuth";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import PurchaseLabsService from "../../../services/patient_portal/purchase-lab.service";
import { paymentMethodType } from "../../../utils/helpers";
import PaymentMethodsForm from "./components/PaymentMethodsForm";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  customSelect: {
    width: "220px",
    marginTop: theme.spacing(5),
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  table: {
    "& th": {
      fontWeight: 600,
    },
  },
  selectCheckbox: {
    padding: 0,
  },
  Total: {
    marginTop: theme.spacing(2),
    "& span": {
      fontWeight: 600,
      marginRight: theme.spacing(1 / 2),
    },
  },
  purchaseButton: {
    display: "block",
    width: "220px",
    marginTop: theme.spacing(8),
  },
}));

const PurchaseLabs = () => {
  const classes = useStyles();
  const { lastVisitedPatient } = useAuth();
  const [selected, setSelected] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [total, setTotal] = useState(0);
  const [labs, setLabs] = useState([]);
  const [isNewPaymentMethodOpen, setIsNewPaymentMethodOpen] = useState(false);

  const fetchPaymentMethods = useCallback(() => {
    PatientPortalService.getPaymentMethods(lastVisitedPatient).then((res) => {
      setPaymentMethods(
        [...res.data, {
          id: 0,
          type: "new",
          account_number: "000",
        }],
      );
    });
  }, [lastVisitedPatient]);

  useEffect(() => {
    PurchaseLabsService.getAll().then((res) => {
      setLabs(res.data);
    });
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const handlePaymentMethodChange = (newPaymentMethod) => {
    if (newPaymentMethod === "new") {
      setIsNewPaymentMethodOpen(true);
    } else {
      setSelectedPaymentMethod(newPaymentMethod);
    }
  };

  const calculateTotal = (selectedLabIds) => {
    const selectedLabs = labs.filter((lab) => selectedLabIds.includes(lab.id));
    const sumOfSelectedLabs = selectedLabs.reduce((acc, lab) => (acc + lab.price), 0);
    setTotal(sumOfSelectedLabs);
  };

  const handleClick = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    calculateTotal(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Purchase Lab Tests
      </Typography>
      <Grid item md={6} sm={12} xs={12}>
        <TableContainer className={classes.tableContainer}>
          <Table size="small" className={classes.table} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Lab Name</TableCell>
                <TableCell>Lab Company</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {labs.map((lab) => {
                const isChecked = isSelected(lab.id);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, lab.id)}
                    role="checkbox"
                  >
                    <TableCell component="th" scope="row">
                      <Checkbox
                        onClick={(event) => handleClick(event, lab.id)}
                        className={classes.selectCheckbox}
                        checked={isChecked}
                      />
                    </TableCell>
                    <TableCell>{lab.cpt_name}</TableCell>
                    <TableCell>{lab.lab_company_name}</TableCell>
                    <TableCell>
                      $
                      {lab.price}
                    </TableCell>
                  </TableRow>
                );
              })}
              <div className={classes.Total}>
                <span>Total:</span>
                {total}
              </div>
            </TableBody>
          </Table>
        </TableContainer>
        <FormControl
          variant="outlined"
          className={classes.customSelect}
          size="small"
        >
          <InputLabel htmlFor="age-native-simple">Select Payment Method</InputLabel>
          <Select
            native
            value={selectedPaymentMethod}
            onChange={(event) => handlePaymentMethodChange(event.target.value)}
            inputProps={{
              name: "type",
              id: "age-native-simple",
            }}
            label="User"
          >
            <option aria-label="None" value="" />
            {paymentMethods.map((pm) => (
              <option key={pm.id} value={pm.type}>
                {paymentMethodType(pm.type)}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          onClick={() => alert("purchase")} // TODO:: incomplete
          className={classes.purchaseButton}
        >
          Purchase
        </Button>
      </Grid>
      <PaymentMethodsForm
        isOpen={isNewPaymentMethodOpen}
        onClose={() => setIsNewPaymentMethodOpen(false)}
        reloadData={() => fetchPaymentMethods()}
      />
    </div>
  );
};

export default PurchaseLabs;
