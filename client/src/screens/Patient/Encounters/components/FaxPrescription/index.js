import React from "react";

import {
  Box,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PdfFilePath from "../../../../../assets/docs/sample.pdf";
import SampleDocumentViewer from "../SampleDocViewer";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 14,
  },
  button: {
    minWidth: 100,
    "& a": {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
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
            <a
              download
              href={PdfFilePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
          >
            Print
          </Button>
        </Grid>
      </Grid>

      {/* sample document for the time being */}
      <SampleDocumentViewer />
    </>
  );
};

export default FaxPrescription;
