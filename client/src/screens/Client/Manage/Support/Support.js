import React, { useState, useEffect } from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import SupportAPI from "../../../../services/supportStatus.service";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },

  tableContainer: {
    minWidth: 650,
    marginTop: theme.spacing(2),
    maxWidth: "70%",
  },

  actions: {
    textAlign: "center",
    display: "flex",
    border: "none",
    "& button": {
      fontSize: "12px",
    },
  },
  customSelect: {
    width: "185px",
    margin: theme.spacing(2, 0, 0, 0),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    width: "185px",
  },
  overFlowControl: {
    maxWidth: "130px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0,0,0,0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}))(Tooltip);

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

export default function Support() {
  const classes = useStyles();
  const [cases, setCases] = useState("");
  const [caseStatus, setCaseStatus] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [noData, setNodata] = useState("");

  const fetchStatus = () => {
    SupportAPI.getStatus().then((res) => setCaseStatus(res.data.data));
  };

  const fetchStatusSupport = () => {
    SupportAPI.getSuport(cases).then((res) => {
      if (res.data.data.length > 0) {
        setSearchResults(res.data.data);
      } else {
        setSearchResults([]);
        setNodata("None Found");
      }
    });
  };

  useEffect(() => {
    fetchStatus();
  }, []);
  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item xs={12} sm={3}>
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Technical Support
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is used for support
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.customSelect}
          >
            <InputLabel htmlFor="opneCases">Case Status</InputLabel>
            <Select
              native
              labelId="opneCases"
              id="openCases"
              value={cases}
              onChange={(event) => setCases(event.target.value)}
              label="Case Status"
            >
              <option aria-label="None" value="" />
              {caseStatus.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            margin="normal"
            size="small"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => fetchStatusSupport()}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {searchResults.length > 0 ? (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table
            size="small"
            className={classes.table}
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell padding="default">Case ID</StyledTableCell>
                <StyledTableCell padding="default">Client</StyledTableCell>
                <StyledTableCell padding="default">Subject</StyledTableCell>
                <StyledTableCell padding="default">Status</StyledTableCell>
                <StyledTableCell padding="default">Created</StyledTableCell>
                <StyledTableCell padding="default">Created By</StyledTableCell>
                <StyledTableCell padding="default">Updated</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((result) => (
                <StyledTableRow key={result.id}>
                  <TableCell padding="default" component="th" scope="row">
                    {result.id}
                  </TableCell>
                  <TableCell padding="default" component="th" scope="row">
                    {result.client_name}
                  </TableCell>
                  {result.subject.length > 40 ? (
                    <LightTooltip
                      className={classes.overFlowControl}
                      title={result.subject}
                    >
                      <TableCell padding="default" component="th" scope="row">
                        {result.subject}
                      </TableCell>
                    </LightTooltip>
                  ) : (
                    <TableCell
                      padding="default"
                      className={classes.overFlowControl}
                      component="th"
                      scope="row"
                    >
                      {result.subject}
                    </TableCell>
                  )}
                  <TableCell padding="default" component="th" scope="row">
                    {result.case_status}
                  </TableCell>
                  <TableCell padding="default" component="th" scope="row">
                    {moment(result.created).format("lll")}
                  </TableCell>
                  <TableCell padding="default" component="th" scope="row">
                    {result.created_user}
                  </TableCell>
                  <TableCell padding="default" component="th" scope="row">
                    {moment(result.updated).format("lll")}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography component="p" variant="body2" color="textPrimary">
          {noData}
        </Typography>
      )}
    </div>
  );
}
