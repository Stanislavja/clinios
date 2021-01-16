import React, { useEffect, useState, useCallback } from "react";

import {
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PatientService from "../../../../../services/patient.service";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 14,
  },
}));

const DiagnoseHover = () => {
  const classes = useStyles();
  const [recentICDs, setRecentICDs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecentICDs = useCallback(() => {
    PatientService.getEncountersRecentDiagnoses().then((response) => {
      setRecentICDs(response.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchRecentICDs();
  }, [fetchRecentICDs]);

  return (
    <Box minWidth={425}>
      <Grid container>
        <Grid item lg={6}>
          <Typography variant="h5" gutterBottom>
            Recent ICDs
          </Typography>
          {recentICDs.length
            ? recentICDs.map((item) => (
              <Grid key={item}>
                <Typography gutterBottom variant="body1" className={classes.text}>
                  {item.name}
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
