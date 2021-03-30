import React, { useCallback, useState, useEffect } from "react";

import {
  makeStyles, Typography, Grid, withStyles,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Dialog from "../../../components/Dialog";
import useAuth from "../../../hooks/useAuth";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  listItem: {
    display: 'flex',
  },
  tab: {
    paddingBottom: 5,
    margin: "5px 16px 5px 0",
    fontSize: 14,
    cursor: "pointer",
  },
  tabSelected: {
    paddingBottom: 5,
    margin: "5px 16px 5px 0",
    fontSize: 14,
    cursor: "pointer",
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  w100: {
    minWidth: 100,
  },
}));

const StyledTableCell = withStyles(() => ({
  head: {
    whiteSpace: "nowrap",
    fontSize: "12px",
    fontWeight: 700,
    padding: "6px 24px 6px 2px",
    borderBottom: "unset",
  },
  body: {
    fontSize: 12,
    borderBottom: "unset",
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

const PurchaseLabs = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { lastVisitedPatient, user } = useAuth();
  const [checked, setChecked] = React.useState([0]);
  const [total, setTotal] = React.useState(0);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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
                <StyledTableCell>Select</StyledTableCell>
                <StyledTableCell>Lab Name</StyledTableCell>
                <StyledTableCell>Lab Company</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-label-${value}`;
               return  <StyledTableRow>
                  <StyledTableCell component="th" scope="item">
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>Initial Group For All Patients</StyledTableCell>
                    <StyledTableCell>Great Plains Laboratory</StyledTableCell>
                    <StyledTableCell>$ 255</StyledTableCell>
                </StyledTableRow>
              })}
              <div className={classes.Total}>
                Total: {total}
              </div>
            </TableBody>
          </Table>
      </TableContainer>
    </Grid>
    </div>
  );
};

export default PurchaseLabs;
