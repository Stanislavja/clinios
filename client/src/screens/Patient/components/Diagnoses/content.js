import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import Tooltip from "../../../../components/common/CustomTooltip";
import usePatientContext from "../../../../hooks/usePatientContext";

const useStyles = makeStyles((theme) => ({
  text12: {
    fontSize: 12,
  },
  inputRow: {
    marginBottom: theme.spacing(0.5),
    flexWrap: "nowrap",
  },
  block: {
    width: 90,
    minWidth: 80,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
  fullWidth: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
}));


const DiagnosesContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data, activeData, status } = state.diagnoses;

  const cardData = status ? activeData : data;

  return (
    <>
      {
        cardData.map((item) => (
          <Grid key={item.icd_id} container className={classes.inputRow}>
            <Typography
              component="span"
              className={`${classes.text12} ${classes.block}`}
              color="textPrimary"
            >
              {moment(item.created).format("MMM D YYYY")}
            </Typography>
            <Typography
              component="span"
              className={`${classes.text12} ${classes.block}`}
              color="textPrimary"
            >
              {item.icd_id}
            </Typography>
            {
              !!item.name && item.name.length > 40
                ? (
                  <Tooltip title={item.name}>
                    <Typography
                      component="span"
                      className={`${classes.text12} ${classes.fullWidth}`}
                      color="textPrimary"
                    >
                      {`${item.name} ${item.active ? "" : "(Inactive)"}`}
                    </Typography>
                  </Tooltip>
                )
                : (
                  <Typography
                    component="span"
                    className={`${classes.text12} ${classes.fullWidth}`}
                    color="textPrimary"
                  >
                    {`${item.name} ${item.active ? "" : "(Inactive)"}`}
                  </Typography>
                )
            }
          </Grid>
        ))
      }
    </>
  );
};

export default DiagnosesContent;
