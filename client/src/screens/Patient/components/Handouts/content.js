import React, { useContext } from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import Tooltip from "../../../../components/common/CustomTooltip";
import { PatientContext } from "../../Patient";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
    flexWrap: "nowrap",
  },
  block: {
    minWidth: 90,
    maxWidth: 120,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
  fullWidth: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
  text12: {
    fontSize: 12,
  },
}));

const HandoutsContent = () => {
  const classes = useStyles();
  const { state } = useContext(PatientContext);
  const { data } = state.handouts;

  return (
    <>
      {
        data.map((item) => (
          <Grid
            key={item.created}
            container
            className={classes.inputRow}
          >
            <Typography
              component="span"
              className={`${classes.text12} ${classes.block}`}
              color="textPrimary"
            >
              {moment(item.created).format("MMM D YYYY")}
            </Typography>
            {
              !!item.filename && item.filename.length > 40
                ? (
                  <Tooltip title={item.filename}>
                    <Typography
                      component="span"
                      className={`${classes.text12} ${classes.fullWidth}`}
                      color="textPrimary"
                    >
                      {item.filename}
                    </Typography>
                  </Tooltip>
                )
                : (
                  <Typography
                    component="span"
                    className={`${classes.text12} ${classes.fullWidth}`}
                    color="textPrimary"
                  >
                    {item.filename}
                  </Typography>
                )
            }
          </Grid>
        ))
      }
    </>
  );
};

export default HandoutsContent;
