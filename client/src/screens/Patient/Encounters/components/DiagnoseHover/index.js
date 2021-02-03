import React, { useEffect, useState, useCallback } from "react";

import {
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import PatientService from "../../../../../services/patient.service";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 14,
    whiteSpace: "nowrap",
    lineHeight: "19px",
  },
}));

const DiagnoseHover = () => {
  const classes = useStyles();
  const { patientId } = useParams();
  const [recentICDs, setRecentICDs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecentICDs = useCallback(() => {
    const encounterId = 2; // hardcoded for now
    PatientService.getEncountersRecentDiagnosesICDs(patientId, encounterId).then((response) => {
      setRecentICDs(response.data);
      setIsLoading(false);
    });
  }, [patientId]);

  useEffect(() => {
    fetchRecentICDs();
  }, [fetchRecentICDs]);

  return (
    <Box minWidth={425}>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <Typography variant="h5" gutterBottom>
            Recent ICDs
          </Typography>
          {recentICDs.length
            ? recentICDs.map((item) => (
              <Grid key={`${item.id}_${Math.random()}`}>
                {/* Math.random was used intentionally to get unique keys */}
                <Typography gutterBottom variant="body1" className={classes.text}>
                  {item.name}
                  {item.id}
                </Typography>
              </Grid>
            ))
            : (
              <Typography gutterBottom variant="body1" className={classes.text}>
                {isLoading ? "Loading..." : "No ICDs found..."}
              </Typography>
            )}
        </Grid>
        <Grid item lg={6}>
          <Typography variant="h5" gutterBottom>
            Recommended ICDs
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DiagnoseHover;
