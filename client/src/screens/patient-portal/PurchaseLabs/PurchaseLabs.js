import React, { useState, useEffect } from "react";

import {
  makeStyles, Typography, Grid,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import PurchaseLabsService from "../../../services/patient_portal/purchase-lab.service";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
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
}));

const PurchaseLabs = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    PurchaseLabsService.getAll().then((res) => {
      setLabs(res.data);
    });
  }, []);

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
      </Grid>
    </div>
  );
};

export default PurchaseLabs;
