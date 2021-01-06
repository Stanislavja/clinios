import React from "react";

import {
  Card,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import PropTypes from "prop-types";

import Colors from "../../theme/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "auto",
    background: Colors.white,
    border: "1px solid rgba(38, 38, 38, 0.12)",
    borderRadius: 4,
    marginBottom: 6,
  },
  titleContainer: {
    borderBottom: `1px solid ${Colors.border}`,
    minHeight: 34,
    background: theme.palette.common.white,
    padding: theme.spacing(1),
  },
  title: {
    fontWeight: "600",
    fontSize: 13,
  },
  cardContent: {
    padding: theme.spacing(1),
    minHeight: 100,
    maxHeight: 250,
    overflowY: "scroll",
  },
  icon: {
    cursor: "pointer",
  },
}));

const PatientCard = (props) => {
  const classes = useStyles();
  const {
    data,
    title,
    icon,
    onIconClick,
  } = props;

  return (
    <>
      <Card
        className={classes.root}
        variant="outlined"
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Typography className={classes.title}>
            {title}
            {" "}
          </Typography>
          {!!icon && (
            <AddIcon
              className={classes.icon}
              fontSize="small"
              onClick={onIconClick}
            />
          )}
        </Grid>
        <Grid className={classes.cardContent}>{data || ""}</Grid>
      </Card>
    </>
  );
};

PatientCard.defaultProps = {
  title: "Title",
  icon: false,
  onIconClick: () => { },
};

PatientCard.propTypes = {
  title: PropTypes.string,
  data: PropTypes.node.isRequired,
  icon: PropTypes.bool,
  onIconClick: PropTypes.func,
};

export default PatientCard;
