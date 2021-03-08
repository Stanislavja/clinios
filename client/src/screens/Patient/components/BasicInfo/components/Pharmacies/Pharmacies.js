import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles, TextField, Grid, Typography, Box, Divider,
} from "@material-ui/core";
import _ from "lodash";

import PatientPortalService from "../../../../../../services/patient_portal/patient-portal.service";
import {
  Pharmacies as pharmacies,
} from "../../../../../../static/patientBasicInfoForm";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 400,
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
    padding: theme.spacing(0.5),
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const Pharmacies = () => {
  const classes = useStyles();
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
  }, 1000);

  return (
    <div className={classes.root}>
      <Grid className={classes.halfSectionCard}>
        <Grid container>
          {pharmacies.map((pharmacy, index) => (
            <Grid key={pharmacy.name} item md={4}>
              <Typography variant="h5" color="textPrimary">
                {`Pharmacy # ${index + 1}`}
              </Typography>
              <TextField
                id={pharmacy.id}
                name={pharmacy.name}
                label={pharmacy.label}
                className={classes.inputTextRow}
                onChange={(e) => debouncedSearchPharmacies(e)}
              />
              {
                searchedResults[pharmacy.name].map((item) => (
                  <Box key={item.id} mb={2}>
                    <Typography gutterBottom>{item.name}</Typography>
                    <Typography gutterBottom>{item.address}</Typography>
                    <Typography gutterBottom>
                      {`${item.city} ${item.state} ${item.postal}`}
                    </Typography>
                    <Typography gutterBottom>
                      Phone
                      <span className={classes.ml1}>{item.phone}</span>
                    </Typography>
                  </Box>
                ))
              }
            </Grid>
          ))}
        </Grid>
      </Grid>
      {
        searchedResults.pharmacy1.length || searchedResults.pharmacy2.length ? (
          <Divider className={classes.divider} />
        )
          : null
      }
      {
        !!patientPharmacy && (
          <Grid className={classes.halfSectionCard}>
            <Typography gutterBottom>{patientPharmacy.name}</Typography>
            <Typography gutterBottom>{patientPharmacy.address}</Typography>
            <Typography gutterBottom>
              {`${patientPharmacy.city || ""} ${patientPharmacy.state || ""} ${patientPharmacy.postal || ""}`}
            </Typography>
            {patientPharmacy.phone && (
              <Typography gutterBottom>
                Phone
                <span className={classes.ml1}>{patientPharmacy.phone}</span>
              </Typography>
            )}
          </Grid>
        )
      }
    </div>
  );
};

export default Pharmacies;
