import React from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    clear: "both",
    position: "relative",
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Container component="footer" maxWidth={false} className={classes.footer}>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          {" "}
          {new Date().getFullYear()}
          {" Clinios"}
        </Typography>
      </Box>
    </Container>
  );
}
