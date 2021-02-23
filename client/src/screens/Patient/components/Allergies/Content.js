import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import usePatientContext from "../../../../hooks/usePatientContext";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
  },
  text12: {
    fontSize: 12,
  },
  noWrap: {
    whiteSpace: "nowrap",
  },
}));

const AllergiesContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data } = state.allergies;

  return (
    <>
      {data.map((item) => (
        <Grid container key={item.drug_id} className={classes.inputRow}>
          <Grid item xs={3}>
            <Typography className={classes.text12}>
              {moment(item.created).format("MMM D YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={`${classes.text12} ${classes.noWrap}`}>
              {item.name}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default AllergiesContent;
