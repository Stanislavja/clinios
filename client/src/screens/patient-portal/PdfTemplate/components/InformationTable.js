/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import { Typography, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";

import { formatPdfDate } from "../../../../utils/helpers";

const useStyles = makeStyles(() => ({
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
}));

const InformationTable = (props) => {
  const classes = useStyles();
  const { testProfileInfo } = props;
  return (
    <>
      <Grid container className={classes.mt5}>
        <Grid
          item
          container
          justify="flex-start"
          direction="column"
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className={classes.tableHeading}
        >
          <Typography variant="h5">Ordering Physician</Typography>
          <Typography className={clsx(classes.ml5, classes.mt10)}>
            <b className={clsx(classes.fontWeight800, classes.fontSize14)}>NPI</b>
            :
            &nbsp;&nbsp;1346417086&nbsp;&nbsp;&nbsp; Bauer,&nbsp;Michael
          </Typography>
        </Grid>
        <Grid
          item
          container
          justify="center"
          direction="column"
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className={classes.tableHeading}
        >
          <Typography variant="h5">Data Information</Typography>
          <Grid container className={clsx(classes.ml5)} style={{ paddingTop: 5 }}>
            <Grid item>
              <Typography component="h1" variant="h5">
                <b className={clsx(classes.fontWeight800, classes.fontSize14)}>
                  Pat ID #:&nbsp;
                  {testProfileInfo.patient_id}
                </b>
              </Typography>
              <Typography variant="h5">
                <b className={clsx(classes.fontWeight800, classes.fontSize14)}>
                  DOB: &nbsp;
                  {formatPdfDate(testProfileInfo.dob)}
                </b>
              </Typography>
            </Grid>
            <Grid item style={{ marginLeft: 4 }}>
              <Typography variant="h5">
                <b className={clsx(classes.fontWeight800, classes.fontSize14)}>
                  &nbsp;Pat Name:
                  {" "}
                  {testProfileInfo.firstname}
                  ,&nbsp;
                  {testProfileInfo.lastname}
                </b>
              </Typography>
              <Grid container justify="space-between">
                <Typography variant="h5" style={{ margin: "0 5px" }}>
                  <b className={clsx(classes.fontWeight800, classes.fontSize14)}>Sex:&nbsp;</b>
                  {" "}
                  {testProfileInfo.gender}
                  &nbsp;&nbsp;
                </Typography>
                <Typography variant="h5">
                  <b className={clsx(classes.fontWeight800, classes.fontSize14)}>
                    Order #:&nbsp;
                    {testProfileInfo.ulta_order}
                  </b>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* table body */}

      <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.tableBody}>
          <Grid container>
            <Typography variant="h5">Responsible Party</Typography>
            <Typography variant="h5" style={{ marginLeft: 10 }}>
              <b className={clsx(classes.fontWeight800, classes.fontSize14)}>Bill Type:</b>
              Client
            </Typography>
          </Grid>
          <Typography className={classes.infoSpace} variant="h4" style={{ margin: "5px 0" }}>
            <b className={clsx(classes.fontWeight1000)} style={{ fontSize: 18 }}>
              Client #:
            </b>
            &nbsp;
            {testProfileInfo.ulta_order}
          </Typography>
          <Typography className={classes.infoSpace}>Ultra Lab Tests, LLC</Typography>
          <Typography className={classes.infoSpace}>9237 E Via de Ventura, Suite 220 </Typography>
          <Typography className={classes.infoSpace}>Scottsdale, AZ 85258 </Typography>
          <a target="_blank" href="http://ultralabtests.com">
            UltraLabTests.com
          </a>
        </Grid>

        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className={classes.tableBody}
        >
          <Typography variant="h4">ClIENT BILL ONLY</Typography>
          <Typography variant="h4">NO PATIENT</Typography>
          <Typography variant="h4">OR</Typography>
          <Typography variant="h4">THIRD PARTY BILLING</Typography>
          <Typography variant="h4">ON THIS ACCOUNT</Typography>
        </Grid>
      </Grid>
    </>
  );
};

InformationTable.propTypes = {
  testProfileInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default InformationTable;
