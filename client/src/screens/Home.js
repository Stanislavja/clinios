import React from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";

import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from "../store/notifications/actions";


const useStyles = makeStyles((theme) => ({
  root: { paddingTop: theme.spacing(3), minHeight: 500 },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));


  const handleClick = () => {
    // NOTE:
    // if you want to be able to dispatch a `closeSnackbar` action later on,
    // you SHOULD pass your own `key` in the options. `key` can be any sequence
    // of number or characters, but it has to be unique for a given snackbar.
    enqueueSnackbar({
      message: "Failed fetching data.",
      options: {
        key: new Date().getTime() + Math.random(),
        variant: "success",
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
        ),
      },
    });
  };

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
        <Button variant="contained" onClick={handleClick}>Display snackbar</Button>
      </Container>
    </>
  );
};

export default Home;
