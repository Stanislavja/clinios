import React from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  root: { paddingTop: theme.spacing(3), minHeight: 500 },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.root}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.pageTitle}
        >
          Home
        </Typography>
      </Container>
    </>
  );
};

export default Home;
