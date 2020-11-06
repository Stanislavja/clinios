import React, { useEffect, useCallback } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Dimmer from "../components/common/Dimmer";
import VerificationMessage from "../components/email/VerificationMessage";
import VerificationSuccess from "../components/email/VerificationSuccess";
import { verificationEmail } from "../store/email/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    textAlign: "center",
    "& p": {
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
}));

const EmailConfirmation = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    match: { params },
  } = props;

  const success = useSelector(
    (state) => state.email.success || false,
    shallowEqual,
  );
  const loading = useSelector(
    (state) => state.email.loading || false,
    shallowEqual,
  );
  const error = useSelector(
    (state) => state.email.error || false,
    shallowEqual,
  );
  const isEmailVerified = useSelector(
    (state) => state.email.isEmailVerified || false,
    shallowEqual,
  );
  const message = useSelector(
    (state) => state.email.message || false,
    shallowEqual,
  );

  const initFetch = useCallback(() => {
    dispatch(verificationEmail(params.userId, params.token));
  }, [dispatch, params]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  let severity = "error";
  if (error) {
    severity = "error";
  }
  if (isEmailVerified) {
    severity = "info";
  }
  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          {(error || isEmailVerified) && (
            <VerificationMessage severity={severity} message={message} />
          )}
          {success && <VerificationSuccess isEmailVerified={isEmailVerified} />}
        </CardContent>
      </Card>

      <Dimmer isOpen={loading} />
    </>
  );
};

export default EmailConfirmation;
