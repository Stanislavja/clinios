import React from "react";

import { Grid, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import usePatientContext from "../../../hooks/usePatientContext";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
  },
  block: {
    width: 90,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "normal",
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  text12: {
    fontSize: 12,
  },
  label: {
    fontWeight: 600,
  },
}));

const EncountersContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data } = state.encounters;

  return (
    <>
      {
        data.map((item, index) => (
          <Grid key={item.id}>
            <Grid className={classes.inputRow} container>
              <Typography
                component="span"
                className={`${classes.text12} ${classes.block}`}
                color="textPrimary"
              >
                {moment(item.dt).format("MMM D YYYY")}
              </Typography>
              <Typography
                component="span"
                className={`${classes.text12} ${classes.block}`}
                color="textPrimary"
              >
                {item.encounter_type}
              </Typography>
              <Typography
                component="span"
                className={`${classes.text12} ${classes.block}`}
                color="textPrimary"
              >
                {item.title}
              </Typography>
              <Typography
                component="span"
                className={`${classes.text12} ${classes.block}`}
                color="textPrimary"
              >
                {item.name}
              </Typography>
            </Grid>

            <Grid className={classes.inputRow}>
              <Typography className={`${classes.text12} ${classes.label}`} color="textPrimary">
                Notes:
              </Typography>
              <Typography className={classes.text12} color="textPrimary">
                {item.notes ? item.notes : "No notes found..."}
              </Typography>
            </Grid>

            <Grid className={classes.inputRow}>
              <Typography className={`${classes.text12} ${classes.label}`} color="textPrimary">
                Treatment Plan:
              </Typography>
              <Typography className={classes.text12} color="textPrimary">
                {item.treatment
                  ? item.treatment
                  : "No treatment found..."}
              </Typography>
            </Grid>

            {index + 1 !== data.length && <Divider className={classes.divider} />}
          </Grid>
        ))
      }
    </>
  );
};

export default EncountersContent;
