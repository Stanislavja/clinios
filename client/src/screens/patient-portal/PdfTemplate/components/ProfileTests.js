/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import { Grid, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    marginTop: 3, width: "100vw", fontSize: 12,
  },
  questId: {
    minWidth: 40, textAlign: "end",
  },
  mid: {
    margin: "0 5px",
  },
});

const ProfileTests = (props) => {
  const classes = useStyles();
  const { profileTests } = props;
  return (
    <>
      {profileTests.map((test) => (
        <Grid
          container
          component="p"
          key={test.quest_id}
          className={classes.root}
        >
          <span className={classes.questId}>{test.quest_id}</span>
          <span className={classes.mid}>-</span>
          <span>{test.quest_name}</span>
        </Grid>
      ))}
    </>
  );
};

ProfileTests.propTypes = {
  profileTests: PropTypes.instanceOf(Array).isRequired,
};

export default ProfileTests;
