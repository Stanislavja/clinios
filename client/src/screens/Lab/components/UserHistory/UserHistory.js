import React, { useEffect, useState, useCallback } from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { StyledTableCellLg, StyledTableRowLg } from "../../../../components/common/StyledTable";
import Dialog from "../../../../components/Dialog";
import LabService from "../../../../services/lab.service";
import { labStatusType, labSourceType } from "../../../../utils/helpers";

const UserHistory = (props) => {
  const { open, onClose } = props;
  const { userId } = useParams();
  const [userHistory, setUserHistory] = useState([]);

  const fetchUserHistory = useCallback(() => {
    LabService.getUserHistory(userId).then((res) => {
      setUserHistory(res.data);
    });
  }, [userId]);

  useEffect(() => {
    fetchUserHistory();
  }, [fetchUserHistory]);

  const UserHistoryTable = () => (
    <Table size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <StyledTableCellLg>Created</StyledTableCellLg>
          <StyledTableCellLg>Created By</StyledTableCellLg>
          <StyledTableCellLg>Status</StyledTableCellLg>
          <StyledTableCellLg>Type</StyledTableCellLg>
          <StyledTableCellLg>Assigned To</StyledTableCellLg>
          <StyledTableCellLg>Patient</StyledTableCellLg>
          <StyledTableCellLg>Note</StyledTableCellLg>
        </TableRow>
      </TableHead>
      <TableBody>
        {userHistory.map((row) => (
          <StyledTableRowLg key={row.type}>
            <StyledTableCellLg component="th" scope="row">
              {row.created}
            </StyledTableCellLg>
            <StyledTableCellLg>{row.lastFour}</StyledTableCellLg>
            <StyledTableCellLg>{labStatusType(row.status)}</StyledTableCellLg>
            <StyledTableCellLg>{labSourceType(row.type)}</StyledTableCellLg>
            <StyledTableCellLg>{row.assigned_to}</StyledTableCellLg>
            <StyledTableCellLg>{row.patient_name}</StyledTableCellLg>
            <StyledTableCellLg>{row.note}</StyledTableCellLg>
          </StyledTableRowLg>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Dialog
      open={open}
      title="User History"
      message={<UserHistoryTable />}
      cancelForm={onClose}
      hideActions
      size="md"
    />
  );
};

UserHistory.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserHistory;
