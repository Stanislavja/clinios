import React, { useState } from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

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
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  titleWrap: {
    display: "flex",
    width: "400px",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
}));

const supports = [
  {
    id: 1,
    name: "Ultrawellness Center",
    created: "2020-12-01T12:18:19.000Z",
    created_by: "Mark Hyman MD",
    subject: "Upload of lab gives error message file not supported",
    status: "Waiting for Clinios",
    updated: "2020-12-01T12:18:19.000Z",
  },
  {
    id: 2,
    name: "Ultrawellness Center",
    created: "2020-12-01T12:18:19.000Z",
    created_by: "Mark Hyman MD",
    subject: "Make a new signup form for me so that I can use this new form",
    status: "Waiting for Customer",
    updated: "2020-12-01T12:18:19.000Z",
  },
];

export default function Home() {
  const classes = useStyles();
  const [caseStatus, setCaseStatus] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setCaseStatus(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleWrap}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.title}
        >
          Home
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">View Open Cases</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value={caseStatus}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="DC">DC</MenuItem>
            <MenuItem value="WC">WC</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Table
        size="small"
        className={classes.table}
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox">Case ID</StyledTableCell>
            <StyledTableCell padding="checkbox">Client</StyledTableCell>
            <StyledTableCell padding="checkbox">Created</StyledTableCell>
            <StyledTableCell padding="checkbox">Created By</StyledTableCell>
            <StyledTableCell padding="checkbox">Subject</StyledTableCell>
            <StyledTableCell padding="checkbox">Status</StyledTableCell>
            <StyledTableCell padding="checkbox">Updated</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {supports.map((s) => (
            <StyledTableRow key="dd">
              <TableCell padding="checkbox" component="th" scope="row">
                {s.id}
              </TableCell>
              <TableCell padding="checkbox" component="th" scope="row">
                {s.name}
              </TableCell>
              <TableCell padding="checkbox" component="th" scope="row">
                {moment(s.created).format("YYYY-MM-DD HH:mm")}
              </TableCell>
              <TableCell padding="checkbox" component="th" scope="row">
                {s.created_by}
              </TableCell>
              <TableCell padding="checkbox" component="th" scope="row">
                {s.subject}
              </TableCell>
              <TableCell padding="checkbox" component="th" scope="row">
                {s.status}
              </TableCell>
              <TableCell padding="checkbox" component="th" scope="row">
                {moment(s.updated).format("YYYY-MM-DD HH:mm")}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
