import React, { useState, useEffect, useCallback } from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import PropTypes from "prop-types";

import { StyledTableCellSm, StyledTableRowSm } from "../../../../components/common/StyledTable";
import LabService from "../../../../services/lab.service";
import { labStatusType, labSourceType } from "../../../../utils/helpers";

const LabValues = (props) => {
  const { labId } = props;
  const [labValues, setLabValues] = useState([]);

  const fetchLabValues = useCallback(() => {
    LabService.getLabValues(labId).then((res) => {
      setLabValues(res.data);
    });
  }, [labId]);

  useEffect(() => {
    fetchLabValues();
  }, [fetchLabValues]);

  return (
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
            <StyledTableRowSm key={row.type}>
              <StyledTableCellSm component="th" scope="row">
                {row.created}
              </StyledTableCellSm>
              <StyledTableCellSm>{row.lastFour}</StyledTableCellSm>
              <StyledTableCellSm>{labStatusType(row.status)}</StyledTableCellSm>
              <StyledTableCellSm>{labSourceType(row.type)}</StyledTableCellSm>
              <StyledTableCellSm>{row.assigned_to}</StyledTableCellSm>
              <StyledTableCellSm>{row.patient_name}</StyledTableCellSm>
            </StyledTableRowSm>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

LabValues.propTypes = {
  labId: PropTypes.number.isRequired,
};

export default LabValues;
