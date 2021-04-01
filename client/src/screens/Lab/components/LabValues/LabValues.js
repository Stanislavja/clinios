import React, { useState, useEffect, useCallback } from "react";

import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import PropTypes from "prop-types";

import { StyledTableCellSm, StyledTableRowSm } from "../../../../components/common/StyledTable";
import LabService from "../../../../services/lab.service";
import { calculateFunctionalRange, calculatePercentageFlag } from "../../../../utils/FunctionalRange";
import GraphDialog from "./component/GraphDialog";
// import { calculateAge } from "../../../../utils/helpers";

const LabValues = (props) => {
  const { labId } = props;
  // TODO::Dynamic values for function range evalution
  const patientAge = 50;
  const gender = "M";

  const [labValues, setLabValues] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [showGraphDialog, setShowGraphDialog] = useState(false);

  const fetchLabValues = useCallback(() => {
    LabService.getLabValues(labId).then((res) => {
      setLabValues(res.data);
    });
  }, [labId]);

  useEffect(() => {
    fetchLabValues();
  }, [fetchLabValues]);

  const toggleGraphDialog = () => {
    setShowGraphDialog((prevState) => !prevState);
  };

  const rowClickHandler = (row) => {
    setSelectedGraph(row.filename);
    toggleGraphDialog();
  };

  const hasValue = (value) => !((typeof value === "undefined") || (value === null));

  return (
    <>
      {!!showGraphDialog && (
        <GraphDialog
          fileName={selectedGraph}
          isOpen={showGraphDialog}
          onClose={toggleGraphDialog}
        />
      )}
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCellSm>Test</StyledTableCellSm>
              <StyledTableCellSm>Result</StyledTableCellSm>
              <StyledTableCellSm>Conventional Range</StyledTableCellSm>
              <StyledTableCellSm>Conventional Flag</StyledTableCellSm>
              <StyledTableCellSm>Functional Range</StyledTableCellSm>
              <StyledTableCellSm>Functional Flag</StyledTableCellSm>
              <StyledTableCellSm>Units</StyledTableCellSm>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!labValues && labValues.length
              ? labValues.map((row) => {
                const functionalRange = calculateFunctionalRange(row.id, gender, patientAge);
                return (
                  <StyledTableRowSm key={row.id} onClick={() => rowClickHandler(row)}>
                    <StyledTableCellSm>{row.name}</StyledTableCellSm>
                    <StyledTableCellSm>{row.value}</StyledTableCellSm>
                    <StyledTableCellSm>
                      {hasValue(row.range_low) && hasValue(row.range_high) && (
                        `${row.range_low} - ${row.range_high}`
                      )}
                    </StyledTableCellSm>
                    <StyledTableCellSm>
                      {
                        hasValue(row.range_low)
                        && hasValue(row.range_high)
                        && hasValue(row.value) && (
                          `${calculatePercentageFlag(row.range_low, row.range_high, row.value)}`
                        )
                      }
                    </StyledTableCellSm>
                    <StyledTableCellSm>
                      {hasValue(functionalRange.low) && hasValue(functionalRange.high)
                        ? `${functionalRange.low} - ${functionalRange.high}`
                        : ""}
                    </StyledTableCellSm>
                    <StyledTableCellSm>
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
                    </StyledTableCellSm>
                    <StyledTableCellSm>{row.unit}</StyledTableCellSm>
                  </StyledTableRowSm>
                );
              })
              : (
                <StyledTableRowSm>
                  <StyledTableCellSm colSpan={7}>
                    <Typography align="center" variant="body1">
                      No Records Found...
                    </Typography>
                  </StyledTableCellSm>
                </StyledTableRowSm>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

LabValues.propTypes = {
  labId: PropTypes.number.isRequired,
};

export default LabValues;
