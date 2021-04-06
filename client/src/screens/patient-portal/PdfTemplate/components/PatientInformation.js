import React from "react";

import { Typography, Grid, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { formatPhoneNumber } from "../../../../utils/helpers";

const useStyles = makeStyles({
  root: {
      // minHeight: "70vh",
    paddingTop: 10,
  },

  coverRoot: {
    minHeight: "92%",
  },

  mt5: {
    marginTop: 5,
  },
  mt20: {
    marginTop: 20,
  },
  clientAndPatientInfo: {
    marginTop: 20,
  },
  infoSpace: {
    lineHeight: 1.3,
  },
  tableHeading: {
    border: "1px solid black",
    padding: "20px 5px 20px 5px",
  },
  tableBody: {
    border: "1px solid black",
    padding: "20px 5px 20px 5px",
  },
  ml5: {
    marginLeft: 5,
  },
  mt2: {
    marginTop: 2,
  },
  mt10: {
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
  },
  fontWeight800: {
    fontWeight: 800,
  },
  fontWeight1000: {
    fontWeight: 1000,
  },
  fontSize14: {
    fontSize: 14,
  },
});

const PatientInformation = (props) => {
  const classes = useStyles();
  const { testProfileInfo } = props;
  return (
    <Grid container justify="space-between" className={classes.clientAndPatientInfo}>
      <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
        <Typography className={classes.infoSpace}>Client&nbsp;#:&nbsp; 97512437</Typography>
        <Typography className={classes.infoSpace}>Ultra Lab Tests, LLC</Typography>
        <Typography className={classes.infoSpace}>9237 E Via de Ventura, Suite 220 </Typography>
        <Typography className={classes.infoSpace}>Scottsdale, AZ 85258 UltraLabTests.com </Typography>
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ alignSelf: "flex-start" }}>
        <Typography className={classes.infoSpace}>Patient Information </Typography>
        <Typography className={classes.infoSpace}>
          {testProfileInfo.firstname}
          ,&nbsp;
          {testProfileInfo.lastname}
        </Typography>
        <Typography className={classes.infoSpace}>
          {" "}
          {testProfileInfo.address}
          {" "}
        </Typography>
        <Typography className={classes.infoSpace}>
          {testProfileInfo.city}
          ,&nbsp;
          {testProfileInfo.state}
          {testProfileInfo.postal}
        </Typography>
        <Typography className={classes.infoSpace}>
          Phone:&nbsp;
          {formatPhoneNumber(testProfileInfo.phone_home).replaceAll(" ", "-")}
        </Typography>
      </Grid>
    </Grid>
  );
};

PatientInformation.propTypes = {
  testProfileInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PatientInformation;
