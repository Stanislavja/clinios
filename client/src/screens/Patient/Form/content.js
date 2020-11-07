import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import PropTypes from "prop-types";

import Tooltip from "../../../components/common/CustomTooltip";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
    flexWrap: "nowrap",
  },
  text12: {
    fontSize: 12,
  },
  block: {
    width: 90,
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
}));

const FormContent = (props) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      {
        data.map((item) => (
          <Grid key={item.created} container className={classes.inputRow}>
            <Typography
              component="span"
              className={`${classes.text12} ${classes.block}`}
              color="textPrimary"
            >
              {moment(item.created).format("MMM D YYYY")}
            </Typography>
            {
              !!item.title && item.title.length > 40
                ? (
                  <Tooltip title={item.title}>
                    <Typography
                      component="span"
                      className={`${classes.text12} ${classes.fullWidth}`}
                      color="textPrimary"
                    >
                      {item.title}
                    </Typography>
                  </Tooltip>
                )
                : (
                  <Typography
                    component="span"
                    className={`${classes.text12} ${classes.fullWidth}`}
                    color="textPrimary"
                  >
                    {item.title}
                  </Typography>
                )
            }
          </Grid>
        ))
      }
    </>
  );
};

FormContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormContent;
