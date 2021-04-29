import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles, withStyles,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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
  statusGroup: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

  const fetchStatusSupport = useCallback(() => {
    SupportAPI.getSuport(cases).then((res) => {
      if (res.data.data.length > 0) {
        setSearchResults(res.data.data);
      } else {
        setSearchResults([]);
        setNodata("None Found");
      }
    });
  }, [cases]);

  useEffect(() => {
    fetchStatusSupport();
  }, [cases, fetchStatusSupport]);

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item xs={12} sm={3}>
          <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
            Technical Support
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is used for support
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <RadioGroup
            className={classes.statusGroup}
            row
            value={cases}
            onChange={(event) => setCases(event.target.value)}
            name="generic"
            defaultValue="all"
            aria-label="position"
          >
            {caseStatus.map((status) => (
              <FormControlLabel
                key={status.id}
                value={status.id}
                label={status.name}
                control={<Radio color="primary" />}
              />
            ))}
            <FormControlLabel
              key={Math.random()}
              value=""
              label="All"
              control={<Radio color="primary" />}
            />
          </RadioGroup>
        </Grid>
      </Grid>

      {searchResults.length > 0 ? (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table size="small" className={classes.table} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">Case ID</StyledTableCell>
                <StyledTableCell padding="checkbox">Client</StyledTableCell>
                <StyledTableCell padding="checkbox">Subject</StyledTableCell>
                <StyledTableCell padding="checkbox">Status</StyledTableCell>
                <StyledTableCell padding="checkbox">Created</StyledTableCell>
                <StyledTableCell padding="checkbox">Created By</StyledTableCell>
                <StyledTableCell padding="checkbox">Updated</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((result) => (
                <StyledTableRow key={result.id}>
                  <TableCell padding="checkbox" component="th" scope="row">
                    {result.id}
                  </TableCell>
                  <TableCell padding="checkbox" component="th" scope="row">
                    {result.client_name}
                  </TableCell>
                  {result.subject.length > 40 ? (
                    <LightTooltip className={classes.overFlowControl} title={result.subject}>
                      <TableCell padding="checkbox" component="th" scope="row">
                        {result.subject}
                      </TableCell>
                    </LightTooltip>
                  ) : (
                    <TableCell
                      padding="checkbox"
                      className={classes.overFlowControl}
                      component="th"
                      scope="row"
                    >
                      {result.subject}
                    </TableCell>
                  )}
                  <TableCell padding="checkbox" component="th" scope="row">
                    {result.case_status}
                  </TableCell>
                  <TableCell padding="checkbox" component="th" scope="row">
                    {moment(result.created).format("lll")}
                  </TableCell>
                  <TableCell padding="checkbox" component="th" scope="row">
                    {result.created_user}
                  </TableCell>
                  <TableCell padding="checkbox" component="th" scope="row">
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
