import React from "react";

import {
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SampleDocumentViewer from "../SampleDocViewer";

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 100,
  },
}));

const FaxLab = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item lg={6}>
          <Grid item lg={10}>
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              label="Fax To"
            />
          </Grid>
        </Grid>
        <Grid item lg={6}>
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
      </Grid>

      {/* sample document for the time being */}
      <SampleDocumentViewer />
    </>
  );
};

export default FaxLab;
