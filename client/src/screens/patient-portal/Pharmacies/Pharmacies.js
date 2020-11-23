import React from "react";

import {
  makeStyles, TextField, Grid, Typography,
} from "@material-ui/core";

import {
  Pharmacies as pharmacies,
} from "../../../static/patientBasicInfoForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  cardRoot: {
    border: "1px solid",
    margin: theme.spacing(0, 0, 1, 0),
    borderRadius: 0,
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  inputTextRow: {
    marginBottom: theme.spacing(3),
  },
  halfSectionCard: {
    padding: theme.spacing(1.5, 0, 1, 0),
    minHeight: 198,
  },
}));

const Pharmacies = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Pharmacies
      </Typography>
      <Grid item xs={6}>
        <Grid className={classes.halfSectionCard}>
          <Grid container>
            {pharmacies.map((pharmacy, index) => (
              <Grid key={pharmacy.name} item md={4}>
                <Typography variant="h4" color="textPrimary">
                  Pharmacy #
                  {" "}
                  {index + 1}
                </Typography>
                <TextField label={pharmacy.name} className={classes.inputTextRow} />
                <Typography gutterBottom>{pharmacy.name}</Typography>
                <Typography gutterBottom>{pharmacy.address}</Typography>
                <Typography gutterBottom>{pharmacy.phone}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Pharmacies;
