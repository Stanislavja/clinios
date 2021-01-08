import React from "react";

import {
  Box,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 14,
  },
  button: {
    minWidth: 100,
  },
}));

const FaxPrescription = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item lg={6}>
        <Grid container spacing={2} component={Box} mb={2}>
          <Grid item lg={6}>
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              label="Pharmacy"
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              label="Fax To"
            />
          </Grid>
        </Grid>


        <Grid container justify="space-between">
          <Button
            className={classes.button}
            variant="outlined"
          >
            Send Fax
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
          >
            Download
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
          >
            Print
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FaxPrescription;
