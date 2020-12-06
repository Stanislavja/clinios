import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  titleWrap: {
    display: "flex",
    width: "400px",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [caseStatus, setCaseStatus] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setCaseStatus(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleWrap}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.title}
        >
          Home
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">View Open Cases</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value={caseStatus}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="DC">DC</MenuItem>
            <MenuItem value="WC">WC</MenuItem>
          </Select>
        </FormControl>
      </div>

    </div>
  );
}
