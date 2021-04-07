import React, { useState, useEffect, useCallback } from "react";

import {
  Container,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdfOutlined";
import moment from "moment";

import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import HandoutDocumentViewerModal from "./components/modal/HandoutDocumentViewerModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  handouts: {
    marginTop: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(1.5),
  },
  listItem: {
    paddingLeft: theme.spacing(0),
  },
}));

const Handouts = () => {
  const classes = useStyles();
  const [handouts, setHandouts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilepath, setSelectedFilepath] = useState(null);

  const fetchHandouts = useCallback(() => {
    PatientPortalService.getHandouts().then((res) => {
      setHandouts(res.data);
    });
  }, []);

  useEffect(() => {
    fetchHandouts();
  }, [fetchHandouts]);

  const handleOnClick = (_, filename) => {
    setSelectedFilepath(`${process.env.REACT_APP_API_URL}static/patient/${filename}`);
    setIsOpen(true);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
          Handouts
        </Typography>
        <Typography component="h1" variant="h5" color="textPrimary">
          This page is used to view handouts from your provider.
        </Typography>
        <List component="nav" aria-label="main mailbox folders" className={classes.handouts}>
          {
            handouts.length
              ? handouts.map((item) => (
                <ListItem
                  button
                  key={item.id}
                  onClick={(_) => handleOnClick(_, item.filename)}
                  className={classes.listItem}
                >
                  <ListItemIcon>
                    <PictureAsPdfIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${item?.filename}  ${moment(item?.created).format("MMM Do YYYY")}`}
                  />
                </ListItem>
              ))
              : <Typography>No handouts found...</Typography>
          }
        </List>
      </Container>

      <HandoutDocumentViewerModal
        filePath={selectedFilepath}
        isOpen={isOpen}
        hendleOnClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Handouts;
