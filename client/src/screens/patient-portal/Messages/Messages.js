import React from "react";

import {
  Button, Divider, Grid, makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  titleSection: {
    display: "flex",
    alignItems: "center",
  },
  newMessage: {
    fontSize: "16px",
    marginLeft: "40px",
    marginBottom: "10px",
  },
  content: {
    marginTop: "30px",
  },
  divider: {
    margin: "10px 0",
  },
}));

export default function Messages() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.titleSection}>
        <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
          Messages
        </Typography>
        <Button className={classes.newMessage} size="small" variant="contained" color="primary">
          New Message
        </Button>
      </div>
      <Typography component="p" variant="body2" color="textPrimary">
        This page is used to send administrative messages to your practitioner. To send a new message click
        New Message.
      </Typography>

      <div className={classes.content}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item>
            <Typography component="p" variant="body2" color="textPrimary">
              <smap style={{ fontWeight: "bold" }}>Time: </smap>
              {" "}
              Dec 20 2019 3:00PM
              {" "}
              <span style={{ fontWeight: "bold" }}>Subject: </span>
              {" "}
              Tyroid
              {" "}
              <span style={{ fontWeight: "bold" }}>From: </span>
              Mark Hyman
              {" "}
              <span style={{ fontWeight: "bold" }}>To: </span>
              Jon Doa
              <br />
              Hi John I would like you decrease your tyroid madication by tow grains thanks
            </Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button size="small" variant="outlined">
                  Reply
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="outlined">
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="outlined">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item>
            <Typography component="p" variant="body2" color="textPrimary">
              <smap style={{ fontWeight: "bold" }}>Time: </smap>
              {" "}
              Dec 20 2019 3:00PM
              {" "}
              <span style={{ fontWeight: "bold" }}>Subject: </span>
              {" "}
              Tyroid
              {" "}
              <span style={{ fontWeight: "bold" }}>From: </span>
              Mark Hyman
              {" "}
              <span style={{ fontWeight: "bold" }}>To: </span>
              Jon Doa
              <br />
              Hi John I would like you decrease your tyroid madication by tow grains thanks
            </Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button size="small" variant="outlined">
                  Reply
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="outlined">
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="outlined">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item>
            <Typography component="p" variant="body2" color="textPrimary">
              <smap style={{ fontWeight: "bold" }}>Time: </smap>
              {" "}
              Dec 20 2019 3:00PM
              {" "}
              <span style={{ fontWeight: "bold" }}>Subject: </span>
              {" "}
              Tyroid
              {" "}
              <span style={{ fontWeight: "bold" }}>From: </span>
              Mark Hyman
              {" "}
              <span style={{ fontWeight: "bold" }}>To: </span>
              Jon Doa
              <br />
              Hi John I would like you decrease your tyroid madication by tow grains thanks
            </Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button size="small" variant="outlined">
                  Reply
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="outlined">
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="outlined">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
