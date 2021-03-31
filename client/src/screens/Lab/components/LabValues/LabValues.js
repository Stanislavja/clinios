import React, { useState, useEffect, useCallback } from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { StyledTableCellSm, StyledTableRowSm } from "../../../../components/common/StyledTable";
import LabService from "../../../../services/lab.service";
import { labStatusTypeToLabel, labSourceTypeToLabel } from "../../../../utils/helpers";
import GraphDialog from "./component/GraphDialog";

const useStyles = makeStyles(() => ({
  cursorPointer: {
    cursor: "pointer",
  },
}));

const LabValues = (props) => {
  const classes = useStyles();
  const { labId } = props;
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
            </TableRow>
          </TableHead>
          <TableBody>
            {labValues.map((row) => (
              <StyledTableRowSm
                key={row.type}
                className={classes.cursorPointer}
                onClick={() => rowClickHandler(row)}
              >
                <StyledTableCellSm component="th" scope="row">
                  {row.created}
                </StyledTableCellSm>
                <StyledTableCellSm>{row.lastFour}</StyledTableCellSm>
                <StyledTableCellSm>{labStatusTypeToLabel(row.status)}</StyledTableCellSm>
                <StyledTableCellSm>{labSourceTypeToLabel(row.type)}</StyledTableCellSm>
                <StyledTableCellSm>{row.assigned_to}</StyledTableCellSm>
                <StyledTableCellSm>{row.patient_name}</StyledTableCellSm>
              </StyledTableRowSm>
            ))}
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
