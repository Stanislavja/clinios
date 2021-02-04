import React from "react";

import {
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import HeadingDate from "../HeadingDate";
import LetterHead from "../LetterHead";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 100,
    "& a": {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  borderSection: {
    border: "1px solid #aaa",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    minHeight: 270,
    position: "relative",
  },
}));

const FaxLab = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2} alignItems="center" className={classes.mb2}>
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

      <Grid className={classes.borderSection}>
        <LetterHead />
        <HeadingDate
          heading="Lab Requisition"
        />
      </Grid>
    </>
  );
};

export default FaxLab;
