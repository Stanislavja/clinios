import React, { useEffect, useState, useCallback } from "react";

import {
  TextField,
  Typography,
  Grid,
  Button,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";

import { StyledTableCellSm, StyledTableRowSm } from "../../../../../components/common/StyledTable";
import useDebounce from "../../../../../hooks/useDebounce";
import PatientService from "../../../../../services/patient.service";
import { NewDrugFormFields, GenericOptions } from "../../../../../static/encountersForm";

const useStyles = makeStyles((theme) => ({
  relativePosition: {
    position: "relative",
  },
  resultsContainer: {
    position: "absolute",
    top: 50,
    zIndex: 2,
    width: "100%",
    background: theme.palette.common.white,
    maxHeight: 150,
    overflow: "scroll",
  },
}));

const NewPrescription = (props) => {
  const { onClose } = props;
  const classes = useStyles();
  const currentDate = new Date();
  const [drugSearchResults, setDrugSearchResults] = useState([]);
  const [drugFrequencies, setDrugFrequencies] = useState([]);
  const [recentSelections, setRecentSelections] = useState([]);
  const [formFields, setFormFields] = useState({
    type: "",
    frequency: "",
    startDate: currentDate,
    expires: "",
    amount: "",
    refills: "",
    patientInstructions: "",
    pharmacyInstructions: "",
    generic: "yes",
  });

  const debouncedSearchTerm = useDebounce(formFields.type, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const reqBody = {
        data: {
          text: debouncedSearchTerm,
        },
      };
      PatientService.searchEncountersPrescriptionsDrugs(reqBody)
        .then((res) => {
          setDrugSearchResults(res.data);
        });
    }
  }, [debouncedSearchTerm]);

  const fetchRecentPrescriptions = useCallback(() => {
    PatientService.getEncountersPrescriptions()
      .then((response) => {
        setRecentSelections(response.data);
      });
  }, []);

  const fetchDrugFrequencies = useCallback(() => {
    PatientService.getEncountersPrescriptionsDrugsFrequencies()
      .then((response) => {
        setDrugFrequencies(response.data);
      });
  }, []);

  useEffect(() => {
    fetchRecentPrescriptions();
    fetchDrugFrequencies();
  }, [fetchRecentPrescriptions, fetchDrugFrequencies]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    const name = "startDate";
    setFormFields({
      ...formFields,
      [name]: date,
    });
  };

  const handleDrugTypeChange = (value) => {
    const name = "type";
    setFormFields({
      ...formFields,
      [name]: `${value} `,
    });
    setDrugSearchResults([]);
  };

  const renderOptionsForDropdowns = (value) => {
    switch (value) {
      case "Frequency": {
        const frequencyOptions = drugFrequencies.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.descr}
          </MenuItem>
        ));
        return frequencyOptions;
      }
      default:
        return <div />;
    }
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        New Drug
      </Typography>
      <Grid container>
        <Grid item lg={4} md={4} xs={12}>
          <form>
            <Grid
              item
              lg={10}
              md={10}
              xs={12}
              className={classes.relativePosition}
            >
              {NewDrugFormFields.map((item) => (
                <Box mb={1} key={item.id}>
                  {item.type === "date"
                    ? (
                      <KeyboardDatePicker
                        key={item.id}
                        margin="dense"
                        inputVariant="outlined"
                        id="date-picker-dialog"
                        label={item.label}
                        format="dd/MM/yyyy"
                        value={formFields.startDate}
                        onChange={handleDateChange}
                        minDate={currentDate}
                        fullWidth
                        required
                      />
                    )
                    : (
                      <TextField
                        key={item.id}
                        label={item.label}
                        variant="outlined"
                        margin="dense"
                        name={item.name}
                        id={item.id}
                        type={item.type}
                        value={formFields[item.name]}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                        required
                        select={item.baseType === "select"}
                        inputProps={{
                          autoComplete: "off",
                        }}
                      >
                        {item.baseType === "select" && renderOptionsForDropdowns(item.label)}
                      </TextField>
                    )}
                </Box>
              ))}
              {
                (!!drugSearchResults && drugSearchResults.length) ? (
                  <Paper className={classes.resultsContainer}>
                    <List>
                      {drugSearchResults.map((drug) => (
                        <ListItem
                          button
                          onClick={() => handleDrugTypeChange(drug.name)}
                          key={drug.name}
                        >
                          <ListItemText primary={drug.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )
                  : null
              }
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={formFields.generic}
                  onChange={handleInputChange}
                  name="generic"
                  defaultValue="top"
                >
                  {GenericOptions.map((item) => (
                    <FormControlLabel
                      key={`${item.label}_${item.value}`}
                      value={item.value}
                      label={item.label}
                      control={<Radio color="primary" />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <Grid
                container
                justify="space-between"
                component={Box}
                mt={2}
              >
                <Button variant="outlined" type="submit">
                  Save
                </Button>
                <Button variant="outlined" onClick={() => onClose()}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <Typography variant="h5" gutterBottom>
            Recent selections, click to populate
          </Typography>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCellSm>Drug and Type</StyledTableCellSm>
                <StyledTableCellSm>Frequency</StyledTableCellSm>
                <StyledTableCellSm>Expires</StyledTableCellSm>
                <StyledTableCellSm>Amount</StyledTableCellSm>
                <StyledTableCellSm>Refills</StyledTableCellSm>
                <StyledTableCellSm>Generic</StyledTableCellSm>
                <StyledTableCellSm>Patient Note</StyledTableCellSm>
                <StyledTableCellSm>Pharmacy Note</StyledTableCellSm>
                <StyledTableCellSm>Last Used</StyledTableCellSm>
                <StyledTableCellSm>Count</StyledTableCellSm>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentSelections.length
                ? recentSelections.map((row) => (
                  <StyledTableRowSm key={row.type}>
                    <StyledTableCellSm component="th" scope="row">
                      {row.created}
                    </StyledTableCellSm>
                    <StyledTableCellSm>{row.lastFour}</StyledTableCellSm>
                    <StyledTableCellSm>{row.note}</StyledTableCellSm>
                    <StyledTableCellSm>{row.note}</StyledTableCellSm>
                    <StyledTableCellSm>{row.assigned_to}</StyledTableCellSm>
                    <StyledTableCellSm>{row.patient_name}</StyledTableCellSm>
                    <StyledTableCellSm>{row.note}</StyledTableCellSm>
                  </StyledTableRowSm>
                ))
                : (
                  <StyledTableRowSm>
                    <StyledTableCellSm colSpan={10}>
                      <Typography align="center" variant="body1">
                        No Records Found...
                      </Typography>
                    </StyledTableCellSm>
                  </StyledTableRowSm>
                )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};

NewPrescription.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NewPrescription;
