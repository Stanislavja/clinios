/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prefer-stateless-function */
import React from "react";

import {
  Typography, Grid, createStyles, withStyles, Box,
} from "@material-ui/core";
import PropTypes from "prop-types";

import { formatDate } from "../../../utils/helpers";

const styles = (theme) => createStyles({
  root: {
    padding: 20,
    minHeight: "70vh",
  },
  coverRoot: {
    minHeight: "85%",
  },
  pscHoldOrderText: {
    color: theme.palette.warning.main,
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
    margin: theme.spacing(1, 0),
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
});

class PdfTemplate extends React.Component {
  render() {
    const { classes, testProfileInfo, profileTests } = this.props;
    if (!testProfileInfo || !profileTests) return <Box>Please wait ...</Box>;
    return (
      <Box className={classes.root}>
        <Box className={classes.coverRoot}>
          <Grid container justify="space-between">
            <Grid item>
              <img src="https://content.ultalabtests.com/static/images/Logo.png" alt="logo" />
            </Grid>
            <Grid item>
              <Typography variant="h4" color="primary">
                Quest Diagnostics Incorporated
              </Typography>
              <Typography variant="h2" className={classes.pscHoldOrderText}>
                PSC HOLD ORDER
              </Typography>
            </Grid>
          </Grid>
          <Box className={classes.mt5}>
            <Typography component="p">
              National Clinical Account - Questions Please Call 866-226-8046
            </Typography>
          </Box>
          {/* client and patient information */}
          <Grid container justify="space-between" className={classes.clientAndPatientInfo}>
            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
              <Typography className={classes.infoSpace}>
                Client #
                {testProfileInfo.ulta_order}
              </Typography>
              <Typography className={classes.infoSpace}>Ultra Lab Tests, LLC</Typography>
              <Typography className={classes.infoSpace}>9237 E Via de Ventura, Suite 220 </Typography>
              <Typography className={classes.infoSpace}>Scottsdale, AZ 85258 UltraLabTests.com </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ alignSelf: "flex-start" }}>
              <Typography className={classes.infoSpace}>Patient Information </Typography>
              <Typography className={classes.infoSpace}>
                {testProfileInfo.firstname}
                ,
                {testProfileInfo.lastname}
              </Typography>
              <Typography className={classes.infoSpace}>
                {testProfileInfo.address}
                {" "}
              </Typography>
              <Typography className={classes.infoSpace}>
                {testProfileInfo.city}
                ,
                {testProfileInfo.state}
                {" "}
                {testProfileInfo.postal}
              </Typography>
              <Typography className={classes.infoSpace}>
                Phone:
                {testProfileInfo.phone_home}
              </Typography>
            </Grid>
          </Grid>

          <Box>
            <Typography variant="h5">SPECIMENS MUST BE TESTED IN A QLS LABORATORY</Typography>
          </Box>

          <Box className={classes.mt5}>
            <Typography variant="h4">
              IMPORTANT – Please forward specimens to Quest Diagnostics National Laboratory
            </Typography>
          </Box>
          {/* table heading */}

          <Grid container className={classes.mt5}>
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
              <Typography variant="h4">Order Physician</Typography>
              <Typography className={classes.ml5}>NPI: 1346417086 Bauer, Michael</Typography>
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
              <Typography variant="h4">Data Information</Typography>
              <Grid container className={classes.ml5}>
                <Grid item>
                  <Typography variant="h5">
                    Pat ID #
                    {testProfileInfo.patient_id}
                  </Typography>
                  <Typography variant="h5">
                    DOB:
                    {formatDate(testProfileInfo.dob)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    Pat Name:
                    {" "}
                    {testProfileInfo.firstname}
                    ,
                    {testProfileInfo.lastname}
                  </Typography>
                  <Grid container justify="space-between">
                    <Typography variant="h5" style={{ margin: "0 5px" }}>
                      Sex:
                      {" "}
                      {testProfileInfo.gender}
                    </Typography>
                    <Typography variant="h5">
                      Order #
                      {testProfileInfo.ulta_order}
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
                  Bill Type : Client
                </Typography>
              </Grid>
              <Typography className={classes.infoSpace} variant="h4">
                Client #
                {" "}
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

          {/* Profile Tests */}
          <Box className={classes.mt20}>
            <Typography variant="h4">Profiles/Tests</Typography>
          </Box>
          <Box style={{ marginTop: 15, paddingLeft: 10 }}>
            {profileTests.map((test) => (
              <Typography component="p" key={test.quest_id} style={{ marginTop: 3 }}>
                {test.quest_id}
                {" "}
                -
                {test.quest_name}
              </Typography>
            ))}
          </Box>
        </Box>
        {/* footer */}
        <Box className={classes.footer}>
          <Typography variant="h4" color="error">
            Bring this sheet to the Patient Service Center. See Attached Patient Instructions.
          </Typography>
          <Typography component="p">
            By submitting this Requisition form to the patient service center and or having your specimen
            collected, you agree to the Ulta Lab Tests Patient Agreement, which is located in your patient
            portal. If you do not agree to the Patient Agreement, do not use this Requisition form or the Ulta
            Lab Tests platform
          </Typography>
        </Box>
      </Box>
    );
  }
}

PdfTemplate.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  testProfileInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  profileTests: PropTypes.instanceOf(Array).isRequired,
};

export default withStyles(styles, { withTheme: true })(PdfTemplate);
