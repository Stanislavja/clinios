import React, { useState, useEffect, useCallback } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import moment from "moment";

import usePatientContext from "../../../../hooks/usePatientContext";
import { InsightsTests } from "../../../../static/insightsTests";
import { calculateFunctionalRange, calculatePercentageFlag } from "../../../../utils/FunctionalRange";
import { calculateAge } from "../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    border: "none",
    "& button": {
      fontSize: "12px",
    },
  },
  noRecordsMessage: {
    lineHeight: "21px",
    fontSize: 12,
  },
  mr: {
    marginRight: theme.spacing(1),
  },
  status: {
    marginLeft: theme.spacing(1),
    color: "orange",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "12px",
    whiteSpace: "nowrap",
    fontWeight: 700,
    padding: "0px 6px 6px 2px",
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
    },
    "& td": {
      fontSize: 12,
      whiteSpace: "nowrap",
      padding: "2px 16px 2px 2px",
      "& svg": {
        fontSize: "1rem",
        position: "relative",
        zIndex: 1,
        top: 3,
        left: -3,
      },
    },
  },
}))(TableRow);

const InsightsContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data } = state.tests;
  const { gender, dob } = state.patientInfo.data;
  const patientAge = Number(calculateAge(dob).split(" ")[0]);

  const [tests, setTests] = useState([]);

  const hasValue = (value) => !((typeof value === "undefined") || (value === null));

  const filterRequiredTests = useCallback(() => {
    if (!!data && data.length) {
      const tempArray = [];
      InsightsTests.forEach((test) => {
        data.forEach((allTest) => {
          if (test.id === allTest.cpt_id) {
            tempArray.push({
              ...allTest,
              ...test,
            });
          }
        });
      });
      setTests([...tempArray]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    filterRequiredTests();
  }, [filterRequiredTests]);

  const getFlag = (value, functionalRange) => {
    const flag = {};
    if (hasValue(functionalRange.low) && hasValue(functionalRange.high)) {
      flag.value = `${calculatePercentageFlag(functionalRange.low, functionalRange.high, value.value)
      }`;
    } else if (hasValue(value.range_low) && hasValue(value.range_high)) {
      flag.value = `${calculatePercentageFlag(value.range_low, value.range_high, value.value)}`;
    }
    if (flag.value) {
      if (flag.value.includes("Low")) {
        flag.icon = "low";
      } else if (flag.value.includes("High")) {
        flag.icon = "high";
      }
    }
    return flag;
  };

  const getRange = (value, functionalRange) => {
    const range = {};
    if (hasValue(functionalRange.low) && hasValue(functionalRange.high)) {
      range.value = `${functionalRange.low} - ${functionalRange.high}`;
    } else if (hasValue(value.range_low) && hasValue(value.range_high)) {
      range.value = `${value.range_low} - ${value.range_high}`;
    }
    return range;
  };

  const renderIcon = (value) => {
    switch (value) {
      case 0:
        return <ArrowDownwardIcon />;
      case 1:
        return <ArrowUpwardIcon />;
      default:
        return () => { };
    }
  };

  const calculateStatus = (flag, icon) => {
    if ((flag === "low" && icon === 0) || (flag === "high" && icon === 1)) {
      return (
        <span className={classes.status}>Yes</span>
      );
    }
    return true;
  };

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Test</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Value</StyledTableCell>
              <StyledTableCell>Range</StyledTableCell>
              <StyledTableCell>Flag</StyledTableCell>
              <StyledTableCell>Iron Deficiency</StyledTableCell>
              <StyledTableCell>Blood Loss</StyledTableCell>
              <StyledTableCell>Inflammation</StyledTableCell>
              <StyledTableCell>Hemolytic</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!tests && tests.length
              ? tests.map((row) => {
                const functionalRange = calculateFunctionalRange(row.cpt_id, gender, patientAge);
                const flag = getFlag(row, functionalRange);
                const range = getRange(row, functionalRange);
                return (
                  <StyledTableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {row.lab_dt ? moment(row.lab_dt).format("MMM D YYYY") : ""}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{range.value}</TableCell>
                    <TableCell>
                      {flag.value}
                    </TableCell>
                    <TableCell>
                      {row.ironNormal ? <span className={classes.mr}>N</span> : ""}
                      {renderIcon(row.iron)}
                      {calculateStatus(flag.icon, row.iron)}
                    </TableCell>
                    <TableCell>
                      {row.bloodNormal ? <span className={classes.mr}>N</span> : ""}
                      {renderIcon(row.blood)}
                      {calculateStatus(flag.icon, row.blood)}
                    </TableCell>
                    <TableCell>
                      {row.inflammationNormal ? <span className={classes.mr}>N</span> : ""}
                      {renderIcon(row.inflammation)}
                      {calculateStatus(flag.icon, row.inflammation)}
                    </TableCell>
                    <TableCell>
                      {row.hemolyticNormal ? <span className={classes.mr}>N</span> : ""}
                      {renderIcon(row.hemolytic)}
                      {calculateStatus(flag.icon, row.hemolytic)}
                    </TableCell>
                  </StyledTableRow>
                );
              })
              : (
                <StyledTableRow>
                  <TableCell colSpan={10}>
                    <Typography className={classes.noRecordsMessage} align="center" variant="body1">
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

InsightsContent.propTypes = {
};

export default InsightsContent;
