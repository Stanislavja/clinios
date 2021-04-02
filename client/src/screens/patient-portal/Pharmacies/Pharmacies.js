import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles, TextField, Grid, Typography, Box, Divider,
  List,
  ListItem,
} from "@material-ui/core";
import _ from "lodash";
import { useSnackbar } from "notistack";

import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
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
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const Pharmacies = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [patientPharmacy, setPatientPharmacy] = useState(null);
  const [searchedResults, setSearchedResults] = useState({
    pharmacy1: [],
    pharmacy2: [],
  });

  const fetchPatienPharmacy = useCallback(() => {
    PatientPortalService.getPharmacies().then((res) => {
      setPatientPharmacy(res.data.length ? res.data[0] : null);
    });
  }, []);

  useEffect(() => {
    fetchPatienPharmacy();
  }, [fetchPatienPharmacy]);

  const debouncedSearchPharmacies = _.debounce((event) => {
    const { name, value } = event.target;
    if (value.length > 5) {
      const reqBody = {
        data: {
          text: value,
        },
      };
      PatientPortalService.searchPharmacies(reqBody).then((res) => {
        setSearchedResults({
          ...searchedResults,
          [name]: res.data,
        });
      });
    }
  }, 1000);

  const saveSelectedPharmacy = (pharmacy) => {
    const pharmacyId = pharmacy.id;
    const reqBody = {
      data: {
        ...pharmacy,
      },
    };
    PatientPortalService.updatePharmacy(pharmacyId, reqBody).then((response) => {
      enqueueSnackbar(`${response.message}`, { variant: "success" });
      fetchPatienPharmacy();
    });
  };

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
                <TextField
                  id={pharmacy.id}
                  name={pharmacy.name}
                  label={pharmacy.label}
                  className={classes.inputTextRow}
                  onChange={(e) => debouncedSearchPharmacies(e)}
                />
                <List component="ul">
                  {
                    searchedResults[pharmacy.name].map((item) => (
                      <ListItem
                        key={item.id}
                        disableGutters
                        button
                        onClick={() => saveSelectedPharmacy(item)}
                      >
                        <Box key={item.id}>
                          <Typography gutterBottom>{item.name}</Typography>
                          <Typography gutterBottom>{item.address}</Typography>
                          <Typography gutterBottom>
                            {`${item.city} ${item.state} ${item.postal}`}
                          </Typography>
                          <Typography gutterBottom>
                            Phone
                            {item.phone}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))
                  }
                </List>
                {
                  searchedResults[pharmacy.name].length || searchedResults[pharmacy.name].length ? (
                    <Divider className={classes.divider} />
                  )
                    : null
                }
              </Grid>
            ))}
          </Grid>
        </Grid>
        {
          !!patientPharmacy && (
            <>
              <Typography gutterBottom>{patientPharmacy.name}</Typography>
              <Typography gutterBottom>{patientPharmacy.address}</Typography>
              <Typography gutterBottom>
                {`${patientPharmacy.city} ${patientPharmacy.state} ${patientPharmacy.postal}`}
              </Typography>
              <Typography gutterBottom>
                Phone
                {patientPharmacy.phone}
              </Typography>
            </>
          )
        }
      </Grid>
    </div>
  );
};

export default Pharmacies;
