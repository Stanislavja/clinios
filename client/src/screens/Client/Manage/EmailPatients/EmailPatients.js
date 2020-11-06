import React from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  status: {
    display: "flex",
    alignItems: "center",
  },
  subject: {
    width: "50%",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
  },
  texArea: {
    width: "75%",
  },
  next: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "100px",
  },
  historyTop: {
    marginTop: "15px",
  },
  history: {
    marginTop: "5px",
    display: "flex",
    border: "black solid 1px",
    padding: "5px",
    height: "300px",
    flexDirection: "row",
    "& div": {
      width: "16%",
      margin: "5px",
    },
  },
}));

export default function EmailPatients() {
  const classes = useStyles();
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [inActive, setInActive] = React.useState(false);

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Email Patients
      </Typography>
      <Typography component="p" variant="body2" color="textPrimary">
        This pages send a message to all patients
      </Typography>
      <div className={classes.status}>
        <Typography component="p" variant="body2" color="textPrimary">
          Patient Status:
        </Typography>

        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="active"
              control={<Checkbox color="primary" />}
              label="Active"
              labelPlacement="start"
              disabled={inActive}
              onChange={(event) => setActive(event.target.checked)}
            />
            <FormControlLabel
              value="inactive"
              control={<Checkbox color="primary" />}
              label="Inactive"
              labelPlacement="start"
              onChange={(event) => setInActive(event.target.checked)}
              disabled={active}
            />
          </FormGroup>
        </FormControl>
      </div>

      <div className={classes.fields}>
        <TextField
          className={classes.subject}
          value={subject}
          variant="outlined"
          margin="normal"
          id="subject"
          label="Subject"
          name="subject"
          autoComplete="subject"
          autoFocus
          onChange={(event) => setSubject(event.target.value)}
          size="small"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Message"
          className={classes.texArea}
          InputProps={{
            classes: classes.normalOutline,
            inputComponent: TextareaAutosize,
            rows: 8,
          }}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          size="small"
        />
        <Button
          disabled={!subject || !message}
          variant="contained"
          color="primary"
          className={classes.next}
        >
          Next
        </Button>
      </div>
      <div className={classes.historyTop}>
        <Typography component="p" variant="body2" color="textPrimary">
          History
        </Typography>
        <div className={classes.history}>
          <div>Date</div>
          <div>Subject</div>
          <div>Message</div>
          <div>Status</div>
          <div>Actions</div>
          <div>Sent By</div>
        </div>
      </div>
    </div>
  );
}
