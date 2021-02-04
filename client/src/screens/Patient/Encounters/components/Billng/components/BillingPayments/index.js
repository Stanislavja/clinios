import React, { useState, useEffect, useCallback } from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import { StyledTableRowSm, StyledTableCellSm } from "../../../../../../../components/common/StyledTable";
import usePatientContext from "../../../../../../../hooks/usePatientContext";
import PatientService from "../../../../../../../services/patient.service";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 14,
  },
}));

const BillingPayments = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { patientId } = state;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id || 1;

  const [billingPayments, setBillingPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBillingPayments = useCallback(() => {
    PatientService.geEncountersBillingPayments(patientId, encounterId).then((response) => {
      setBillingPayments(response.data);
      setIsLoading(false);
    });
  }, [patientId, encounterId]);

  useEffect(() => {
    fetchBillingPayments();
  }, [fetchBillingPayments]);

  return (
    <>
      {billingPayments.length
        ? billingPayments.map((item) => (
          <StyledTableRowSm key={item.id}>
            <StyledTableCellSm>{moment(item.created).format("MMM D YYYY hh:mm A")}</StyledTableCellSm>
            <StyledTableCellSm>
              $
              {item.amount}
            </StyledTableCellSm>
            <StyledTableCellSm>{item.type}</StyledTableCellSm>
            <StyledTableCellSm>{item.card_num}</StyledTableCellSm>
          </StyledTableRowSm>
        ))
        : (
          <Typography gutterBottom variant="body1" className={classes.text}>
            {isLoading ? "Loading..." : "No Records found..."}
          </Typography>
        )}
    </>
  );
};

export default BillingPayments;
