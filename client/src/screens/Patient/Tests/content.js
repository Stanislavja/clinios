import React, { useState, useEffect, useCallback } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import usePatientContext from "../../../hooks/usePatientContext";
import { calculateFunctionalRange, calculatePercentageFlag } from "../../../utils/FunctionalRange";
import { calculateAge } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
  },
  tableContainer: {
    minWidth: 650,
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
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "12px",
    whiteSpace: "nowrap",
    fontWeight: 700,
    padding: "6px 24px 6px 2px",
  },
  body: {
    fontSize: 12,
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
      whiteSpace: "nowrap",
      padding: "2px 16px 2px 2px",
    },
    "& td": {
      fontSize: 12,
      whiteSpace: "nowrap",
      padding: "2px 16px 2px 2px",
    },
  },
}))(TableRow);

const TestsContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data } = state.tests;
  const { gender, dob } = state.patientInfo.data;
  const patientAge = Number(calculateAge(dob).split(" ")[0]);

  const [tests, setTests] = useState([]);

  const hasValue = (value) => !((typeof value === "undefined") || (value === null));

  const hasTestValue = (value) => {
    const matchArray = data.filter((x) => x.name === value);
    let res = null;
    if (matchArray.length) {
      const [firstEl] = matchArray;
      res = firstEl;
    }
    return res;
  };

  const addCalculatedTests = useCallback(() => {
    if (!!data && data.length) {
      const tempTestsArray = [...data];
      const sodiumTest = hasTestValue("Sodium");
      const potassiumTest = hasTestValue("Potassium");
      const glucoseTest = hasTestValue("Glucose");
      const ureaTest = hasTestValue("Urea");
      if (!!sodiumTest && !!potassiumTest && !!glucoseTest && !!ureaTest) {
        const newTest = {
          count: 1,
          cpt_id: "Osmolarity",
          lab_dt: new Date(),
          name: "Osmolarity",
          range_high: calculateFunctionalRange("Osmolarity", gender, patientAge).high,
          range_low: calculateFunctionalRange("Osmolarity", gender, patientAge).low,
          unit: "g/dL",
          value: (1.9 * (sodiumTest.value + potassiumTest.value))
            + glucoseTest.value + (ureaTest.value * 0.5) + 5,
        };
        tempTestsArray.push(newTest);
      }
      const hematocritTest = hasTestValue("Hematocrit");
      const proteinTotalTest = hasTestValue("Protein Total");
      if (!!hematocritTest && !!proteinTotalTest) {
        const newTest = {
          count: 1,
          cpt_id: "ViscosityHighShear",
          lab_dt: new Date(),
          name: "Viscosity High Shear",
          range_high: calculateFunctionalRange("ViscosityHighShear", gender, patientAge).high,
          range_low: calculateFunctionalRange("ViscosityHighShear", gender, patientAge).low,
          unit: "g/dL",
          value: (0.12 * hematocritTest.value) + (0.17 * ((proteinTotalTest.value * 10) - 2.07)),
        };
        tempTestsArray.push(newTest);
      }
      const chlorideTest = hasTestValue("Chloride");
      const carbonDioxideTest = hasTestValue("Carbon Dioxide");
      if (!!sodiumTest && !!chlorideTest && !!carbonDioxideTest) {
        const newTest = {
          count: 1,
          cpt_id: "AnionGapNaClHCO3",
          lab_dt: new Date(),
          name: "Anion Gap Na-(Cl+HCO3)",
          range_high: calculateFunctionalRange("AnionGapNaClHCO3", gender, patientAge).high,
          range_low: calculateFunctionalRange("AnionGapNaClHCO3", gender, patientAge).low,
          unit: "g/dL",
          value: sodiumTest.value - (chlorideTest.value + carbonDioxideTest.value),
        };
        tempTestsArray.push(newTest);
      }
      setTests([...tempTestsArray]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, gender, patientAge]);

  useEffect(() => {
    addCalculatedTests();
  }, [addCalculatedTests]);

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Test</StyledTableCell>
              <StyledTableCell>Last Date</StyledTableCell>
              <StyledTableCell>Last Result</StyledTableCell>
              <StyledTableCell>Conv Range</StyledTableCell>
              <StyledTableCell>Conv Flag</StyledTableCell>
              <StyledTableCell>Func Range</StyledTableCell>
              <StyledTableCell>Func Flag</StyledTableCell>
              <StyledTableCell>Units</StyledTableCell>
              <StyledTableCell>Count</StyledTableCell>
              <StyledTableCell>Graph</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!tests && tests.length
              ? tests.map((row) => {
                const functionalRange = calculateFunctionalRange(row.cpt_id, gender, patientAge);
                return (
                  <StyledTableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {row.lab_dt ? moment(row.lab_dt).format("MMM D YYYY") : ""}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>
                      {hasValue(row.range_low) && hasValue(row.range_high) && (
                        `${row.range_low} - ${row.range_high}`
                      )}
                    </TableCell>
                    <TableCell>
                      {
                        hasValue(row.range_low)
                        && hasValue(row.range_high)
                        && hasValue(row.value) && (
                          `${calculatePercentageFlag(row.range_low, row.range_high, row.value)}`
                        )
                      }
                    </TableCell>
                    <TableCell>
                      {hasValue(functionalRange.low) && hasValue(functionalRange.high)
                        ? `${functionalRange.low} - ${functionalRange.high}`
                        : ""}
                    </TableCell>
                    <TableCell>
                      {
                        hasValue(functionalRange.low)
                        && hasValue(functionalRange.high) && (
                          `${calculatePercentageFlag(
                            functionalRange.low,
                            functionalRange.high,
                            row.value,
                          )
                          }`
                        )
                      }
                    </TableCell>
                    <TableCell>{row.unit}</TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>{row.detail}</TableCell>
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

TestsContent.propTypes = {
};

export default TestsContent;
