import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import _ from "lodash";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";

import { AuthConsumer } from "../../providers/AuthProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "600px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
  },
  lockIcon: {
    fontSize: "40px",
  },
  pageTitle: {
    marginBottom: theme.spacing(3),
  },
  userInfo: {
    textAlign: "left",
    width: "100%",
    maxWidth: "88%",
    "& p": {
      margin: 0,
      lineHeight: "24px",
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserSignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const user = useSelector((state) => state.auth.user, shallowEqual);

  return (
    <AuthConsumer>
      {({ isAuth }) => {
        if (isAuth) {
          history.push("/");
        }
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon className={classes.lockIcon} />
              </Avatar>
              <Typography
                component="h1"
                variant="h2"
                className={classes.pageTitle}
              >
                Physician User Registration
              </Typography>
              <div className={classes.userInfo}>
                {!_.isEmpty(user) && (
                  <>
                    <p>
                      Email:
                      {user.email}
                    </p>
                    <p>
                      Client:
                      {user.client && user.client.name}
                    </p>
                    <p>
                      Name:
                      {" "}
                      {user.firstname}
                      {" "}
                      {user.lastname}
                    </p>
                  </>
                )}
              </div>
              <form className={classes.form} noValidate>
                <TextField
                  value={password}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={(
                    <div>
                      <span>
                        Check here to indicate that you have read and agree to
                        the terms of the
                        {" "}
                        <Link href="/agreement">
                          Clinios Customer Agreement
                        </Link>
                      </span>
                    </div>
                  )}
                  className={classes.checkbox}
                  onChange={() => setTermsAndConditions(!termsAndConditions)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => alert("waiting for further instructions...")}
                >
                  Continue
                </Button>
              </form>
            </div>
          </Container>
        );
      }}
    </AuthConsumer>
  );
};

export default UserSignUp;
