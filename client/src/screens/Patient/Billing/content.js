import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography
} from "@material-ui/core";

export default function Content(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      {
        data.map(item => (
          <Grid key={item.tran_type} container className={classes.inputRow}>
            <Grid item className={classes.block}>
              <Typography component="span" variant="body1" color="textPrimary">{moment(item.dt).format("MMM DD YYYY")}</Typography>
            </Grid>
            <Grid item className={classes.block}>
              <Typography component="span" variant="body1" color="textPrimary">{item.tran_type}</Typography>
            </Grid>
            <Grid item className={classes.block}>
              <Typography component="span" variant="body1" color="textPrimary">{item.encounter_title}</Typography>
            </Grid>
            {!!item.cpt_procedure && (
              <Grid item className={classes.block}>
              <Typography component="span" variant="body1" color="textPrimary">{item.cpt_procedure}</Typography>
            </Grid>
            )}
          </Grid>
        ))
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    // marginBottom: theme.spacing(1),
    // fontSize: 14
  },
  block: {
    width: 90,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: theme.spacing(0, 0.5, 0, 0),
  }
}));
