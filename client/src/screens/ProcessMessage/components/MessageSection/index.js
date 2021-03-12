
import React, { useState } from "react";

import {
  Grid, Typography, makeStyles, Button, FormControl, FormControlLabel, RadioGroup, Radio, TextField, Divider,
} from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(2),
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  text12: {
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: "wrap",
  },
  label: {
    marginRight: theme.spacing(1),
    fontWeight: "bold",
  },
  borderSection: {
    border: "1px solid #aaa",
    padding: theme.spacing(2),
    minHeight: 100,
  },
  divider: {
    margin: theme.spacing(3, 0),
    background: "#aaa",
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
}));

const StatusSelectionFields = [
  {
    label: "Open",
    value: "1",
  },
  {
    label: "Closed",
    value: "0",
  },
];

const ProcessMessage = (props) => {
  const classes = useStyles();
  const { message, showDivider } = props;
  const [statusSelection, setStatusSelection] = useState("1");

  const handleStatusSelection = (e) => {
    setStatusSelection(e.target.value);
  };

  return (
    <>
      <Grid item lg={8} xs={12}>
        <Grid container spacing={1} className={classes.gutterBottom}>
          <Grid item xs>
            <Typography
              component="span"
              variant="body1"
              className={`${classes.text12} ${classes.label}`}
              color="textPrimary"
            >
              Date:
            </Typography>
            <Typography
              component="span"
              variant="body1"
              className={classes.text12}
              color="textPrimary"
            >
              {moment().format("DD MMMM YYYY")}
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography
              component="span"
              variant="body1"
              className={`${classes.text12} ${classes.label}`}
              color="textPrimary"
            >
              From:
            </Typography>
            <Typography
              component="span"
              variant="body1"
              className={classes.text12}
              color="textPrimary"
            >
              {message}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              component="span"
              variant="body1"
              className={`${classes.text12} ${classes.label}`}
              color="textPrimary"
            >
              To:
            </Typography>
            <Typography
              component="span"
              variant="body1"
              className={classes.text12}
              color="textPrimary"
            >
              To
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              component="span"
              variant="body1"
              className={`${classes.text12} ${classes.label}`}
              color="textPrimary"
            >
              Status:
            </Typography>
            <Typography
              component="span"
              variant="body1"
              className={classes.text12}
              color="textPrimary"
            >
              Status
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.gutterBottom}>
        <Grid item xs>
          <Typography
            component="span"
            variant="body1"
            className={`${classes.text12} ${classes.label}`}
            color="textPrimary"
          >
            Subject:
          </Typography>
          <Typography
            component="span"
            variant="body1"
            className={classes.text12}
            color="textPrimary"
          >
            Subject
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.gutterBottom}>
        <Grid item xs>
          <Typography
            component="span"
            variant="body1"
            className={`${classes.text12} ${classes.label}`}
            color="textPrimary"
          >
            Message:
          </Typography>
          <Typography
            component="span"
            variant="body1"
            className={classes.text12}
            color="textPrimary"
          >
            Message
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.gutterBottom}>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            className={classes.mr2}
          >
            Send Message to Patient
          </Button>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Typography
              component="span"
              variant="body1"
              className={`${classes.text12} ${classes.label}`}
              color="textPrimary"
            >
              Message:
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={statusSelection}
                onChange={handleStatusSelection}
              >
                {StatusSelectionFields.map((radioOption) => (
                  <FormControlLabel
                    key={`${radioOption.label}_${radioOption.value}`}
                    value={radioOption.value}
                    label={radioOption.label}
                    control={<Radio color="primary" />}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid className={classes.section}>
        <TextField
          variant="outlined"
          size="small"
          label="Assign To"
          name="assignTo"
          type="text"
          required
        // value={formFields[item.name]}
        // onChange={(e) => handleInputChnage(e)}
        />
      </Grid>

      <Grid container justify="space-between" spacing={1}>
        <Grid item lg={7} xs={12}>
          <TextField
            variant="outlined"
            name="notes"
            label="Assignment Notes"
            type="text"
            fullWidth
            multiline
            rows={5}
          />
        </Grid>
        <Grid item lg={4} xs={12} className={classes.borderSection}>
          Message History
        </Grid>
      </Grid>
      {
        showDivider && (
          <Divider className={classes.divider} />
        )
      }
    </>
  );
};

ProcessMessage.propTypes = {
  showDivider: PropTypes.bool.isRequired,
  message: PropTypes.shape({}).isRequired,
};

export default ProcessMessage;
