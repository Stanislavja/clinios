/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prefer-stateless-function */
import React from "react";

import {
  Typography, createStyles, withStyles, Box,
} from "@material-ui/core";
import PropTypes from "prop-types";

import Footer from "./components/Footer";
import Header from "./components/Header";
import InformationTable from "./components/InformationTable";
import PatientInformation from "./components/PatientInformation";
import ProfileTestsComponent from "./components/ProfileTests";

const styles = () => createStyles({
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

class PdfTemplate extends React.Component {
  render() {
    const { classes, testProfileInfo, profileTests } = this.props;
    return (
      <Box className={classes.root}>
        <Box className={classes.coverRoot}>
          <Header />
          <Box className={classes.mt5}>
            <Typography component="p">
              National Clinical Account - Questions Please Call 866-226-8046
            </Typography>
          </Box>
          {/* client and patient information */}
          <PatientInformation testProfileInfo={testProfileInfo} />
          <Box>
            <Typography variant="h5">SPECIMENS MUST BE TESTED IN A QLS LABORATORY</Typography>
          </Box>

          <Box className={classes.mt5}>
            <Typography variant="h5" style={{ fontWeight: 1000 }}>
              IMPORTANT – Please forward specimens to Quest Diagnostics National Laboratory.
            </Typography>
          </Box>

          <InformationTable testProfileInfo={testProfileInfo} />

          <Box className={classes.mt20}>
            <Typography variant="h4">Profiles/Tests</Typography>
          </Box>
          <Box style={{ marginTop: 15 }}>
            <ProfileTestsComponent profileTests={profileTests} />
          </Box>
        </Box>

        {/* footer */}
        <Footer />
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
