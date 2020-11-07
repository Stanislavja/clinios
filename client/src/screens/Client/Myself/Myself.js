import * as React from "react";

import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import { MyActivityHistory, MyLogins, MyProfile } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 0px",
  },
  tabs: {
    height: "25px",
    minHeight: "25px",
  },
  tabItem: {
    padding: 0,
    minHeight: "20px",
    fontSize: "12px",
    paddingTop: "5px",
    textTransform: "none",
    "& span": {
      textColor: "white",
    },
  },
  tabItems: {
    marginTop: "5px",
    marginBottom: "10px",
  },
  paper: {
    width: "500px",
  },
}));

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Myself = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={0}>
        <Grid item md={12} xs={12}>
          <div className={classes.tabItems}>
            <Paper square className={classes.paper}>
              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab className={classes.tabItem} label="My Activity History" />
                <Tab className={classes.tabItem} label="My Profile" />
                <Tab className={classes.tabItem} label="My Logins" />
              </Tabs>
            </Paper>
          </div>
          <TabPanel value={value} index={0}>
            <MyActivityHistory />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyLogins />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MyProfile />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default Myself;
