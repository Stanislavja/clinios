import React from "react";

import { Typography, Box, makeStyles } from "@material-ui/core";

import colors from "../../../../theme/colors";

const useStyles = makeStyles((theme) => ({
  questDiagnosticHeading: {
    color: colors.headingBlue,
  },
  pscHoldOrderText: {
    color: theme.palette.warning.main,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer}>
      <Typography variant="h6" color="error" style={{ fontSize: 12 }}>
        Bring this sheet to the Patient Service Center. See Attached Patient Instructions.
      </Typography>
      <Typography component="p" style={{ fontSize: 9 }}>
        By submitting this Requisition form to the patient service center and or having your specimen
        collected, you agree to the Ulta Lab Tests Patient Agreement, which is located in your patient portal.
        If you do not agree to the Patient Agreement, do not use this Requisition form or the Ulta Lab Tests
        platform
      </Typography>
    </Box>
  );
};

export default Footer;
