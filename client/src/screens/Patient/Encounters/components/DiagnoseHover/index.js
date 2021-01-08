import React from "react";

import {
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 14,
  },
}));

const DiagnoseHover = () => {
  const classes = useStyles();
  return (
    <Box minWidth={425}>
      <Grid container>
        <Grid item lg={6}>
          <Typography variant="h5" gutterBottom>
            Recent ICDs
          </Typography>
          {[1, 2, 3, 4, 5].map((item) => (
            <Grid key={item}>
              <Typography gutterBottom variant="body1" className={classes.text}>
                Chronic Fatigue (Un-specified)
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item lg={6}>
          <Typography variant="h5" gutterBottom>
            Recommended ICDs
          </Typography>
          {[1, 2, 3, 4, 5].map((item) => (
            <Grid key={item}>
              <Typography gutterBottom variant="body1">
                Chronic Fatigue (Un-specified)
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DiagnoseHover;
