import React from "react";

import { Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import usePatientContext from "../../../hooks/usePatientContext";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
  },
  text12: {
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: "wrap",
  },
  label: {
    marginRight: theme.spacing(1 / 2),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  dateText: {
    minWidth: 80,
  },
}));

const MessagesContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data } = state.messages;

  return (
    <>
      {data.map((item, index) => (
        <Grid key={item.id}>
          <Grid container spacing={1}>
            <Grid item className={classes.dateText}>
              {/* <Typography
                component="span"
                variant="body1"
                className={`${classes.text12} ${classes.label}`}
                color="textPrimary"
              >
                Date:
              </Typography> */}
              <Typography
                component="span"
                variant="body1"
                className={classes.text12}
                color="textPrimary"
              >
                {moment(item.created).format("MMM D YYYY")}
              </Typography>
            </Grid>

            <Grid item xs>
              <Grid container>
                <Grid item xs={4}>
                  <Typography
                    component="span"
                    variant="body1"
                    className={`${classes.text12} ${classes.label}`}
                    color="textPrimary"
                  >
                    From:
                  </Typography>
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.text12}
                    color="textPrimary"
                  >
                    {item.user_to_from || ""}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    component="span"
                    variant="body1"
                    className={`${classes.text12} ${classes.label}`}
                    color="textPrimary"
                  >
                    To:
                  </Typography>
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.text12}
                    color="textPrimary"
                  >
                    {item.user_to_name || ""}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    component="span"
                    variant="body1"
                    className={`${classes.text12} ${classes.label}`}
                    color="textPrimary"
                  >
                    Subject:
                  </Typography>
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.text12}
                    color="textPrimary"
                  >
                    {item.subject}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid key={item.id}>
            <Typography
              variant="body1"
              className={classes.text12}
              color="textPrimary"
            >
              {item.message}
            </Typography>
          </Grid>
          {data.length !== index + 1 && <Divider className={classes.divider} />}
        </Grid>
      ))}
    </>
  );
};

export default MessagesContent;
