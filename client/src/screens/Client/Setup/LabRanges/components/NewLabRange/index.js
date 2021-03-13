import React, {
  useState, useEffect, useCallback, useMemo,
} from "react";

import {
  TextField, Button, Grid, Paper, List, ListItem, ListItemText, MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { isEmpty } from "lodash";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dialog from "../../../../../../components/Dialog";
import useDidMountEffect from "../../../../../../hooks/useDidMountEffect";
import PatientService from "../../../../../../services/patient.service";
import PatientPortalService from "../../../../../../services/patient_portal/patient-portal.service";
import {
  CompareItemOptions,
  CompareOperatorOptions,
  CompareToOptions,
} from "../../../../../../static/setup/labRange";

const useStyles = makeStyles((theme) => ({
  relativePosition: {
    position: "relative",
  },
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
  buttonsContainer: {
    margin: theme.spacing(0, 0, 3, 0),
  },
  w100: {
    width: 100,
  },
  ml2: {
    marginLeft: theme.spacing(2),
  },
  resultsContainer: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    background: theme.palette.common.white,
    maxHeight: 150,
    overflow: "scroll",
  },
}));

const NewLabRange = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    isOpen, onClose, reloadData, selectedItem,
  } = props;

  const isNewDialog = useMemo(() => isEmpty(selectedItem), [selectedItem]);

  const [selectedTest, setSelectedTest] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTestResults, setSearchTestResults] = useState([]);
  const [formFields, setFormFields] = useState({
    sequence: "",
    compareItem: "",
    compareOperator: "",
    compareTo: "",
    rangeLow: "",
    rangeHigh: "",
    created: null,
    updated: null,
  });

  const updateFields = () => {
    formFields.sequence = selectedItem.seq;
    formFields.compareItem = selectedItem.compare_item;
    formFields.compareOperator = selectedItem.compare_operator;
    formFields.compareTo = selectedItem.compare_to;
    formFields.rangeLow = selectedItem.range_low;
    formFields.rangeHigh = selectedItem.range_high;
    formFields.created = moment(selectedItem.created).format("YYYY-MM-DD");
    formFields.updated = moment(selectedItem.updated).format("YYYY-MM-DD");
    setFormFields({ ...formFields });
    setSearchText(selectedItem.cpt_name);
  };

  useEffect(() => {
    if (!isNewDialog) { /* edit scenario */
      updateFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewDialog, selectedItem]);

  const handleInputChnage = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        dt: moment(formFields.date).format("YYYY-MM-DD hh:mm"),
        selectedTest: selectedTest.cpt_id,
        type_id: formFields.type,
        payment_type: formFields.paymentType,
        amount: formFields.amount,
        note: formFields.notes,
        account_number: formFields.accountNum,
      },
    };
    PatientPortalService.createBilling(reqBody).then((response) => {
      enqueueSnackbar(`${response.message}`, { variant: "success" });
      reloadData();
      onClose();
    });
  };

  const searchTests = useCallback((e, text) => {
    e.preventDefault();
    const patientId = 1; /* ::TODO search tests API will be integrated */
    PatientService.getTests(patientId, text).then((res) => {
      setSearchTestResults(res.data);
    });
  }, []);

  const testSelectHandler = (value) => {
    setSelectedTest(value);
    setSearchText(value.name);
    setSearchTestResults([]);
  };

  useDidMountEffect(() => {
    if (!searchText.length) {
      setSearchTestResults([]);
    }
  }, [searchText]);

  const handleDateChange = (name, date) => {
    setFormFields({
      ...formFields,
      [name]: date,
    });
  };

  return (
    <Dialog
      open={isOpen}
      title={`${isNewDialog ? "New" : "Edit"} Functional Range`}
      message={(
        <>
          <Grid item lg={8}>
            <form onSubmit={(e) => searchTests(e, searchText)}>
              <Grid container alignItems="center" className={classes.gutterBottom}>
                <Grid item xs={8} className={classes.relativePosition}>
                  <TextField
                    fullWidth
                    autoFocus
                    label="Test"
                    size="small"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  {
                    searchTestResults.length ? (
                      <Paper className={classes.resultsContainer}>
                        <List>
                          {searchTestResults.map((option) => (
                            <ListItem
                              button
                              onClick={() => testSelectHandler(option)}
                              key={option.id}
                            >
                              <ListItemText primary={option.name} />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    )
                      : null
                  }
                </Grid>
                <Button
                  variant="outlined"
                  type="submit"
                  className={classes.ml2}
                >
                  Search
                </Button>
              </Grid>
            </form>

            <form onSubmit={onFormSubmit}>
              <Grid item lg={8}>
                <TextField
                  variant="outlined"
                  name="sequence"
                  id="sequence"
                  type="number"
                  label="Sequence"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.sequence}
                  onChange={(e) => handleInputChnage(e)}
                />

                <TextField
                  select
                  variant="outlined"
                  name="compareItem"
                  id="compareItem"
                  type="number"
                  label="Compare Item"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.compareItem}
                  onChange={(e) => handleInputChnage(e)}
                >
                  {CompareItemOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  variant="outlined"
                  name="compareOperator"
                  id="compareOperator"
                  type="number"
                  label="Compare Operator"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.compareOperator}
                  onChange={(e) => handleInputChnage(e)}
                >
                  {CompareOperatorOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  variant="outlined"
                  name="compareTo"
                  id="compareTo"
                  type="number"
                  label="Compare To"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.compareTo}
                  onChange={(e) => handleInputChnage(e)}
                >
                  {CompareToOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  variant="outlined"
                  name="rangeLow"
                  id="rangeLow"
                  type="number"
                  label="Range Low"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.rangeLow}
                  onChange={(e) => handleInputChnage(e)}
                />

                <TextField
                  variant="outlined"
                  name="rangeHigh"
                  id="rangeHigh"
                  type="number"
                  label="Range High"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.rangeHigh}
                  onChange={(e) => handleInputChnage(e)}
                />

                <KeyboardDatePicker
                  fullWidth
                  required
                  id="date-created-dialog"
                  name="created"
                  label="Created"
                  format="dd/MM/yyyy"
                  size="small"
                  inputVariant="outlined"
                  value={formFields.created}
                  onChange={(date) => handleDateChange("created", date)}
                  className={classes.gutterBottom}
                />

                <KeyboardDatePicker
                  required
                  fullWidth
                  id="date-updated-dialog"
                  name="updated"
                  label="Updated"
                  format="dd/MM/yyyy"
                  size="small"
                  inputVariant="outlined"
                  value={formFields.updated}
                  onChange={(date) => handleDateChange("updated", date)}
                  className={classes.gutterBottom}
                />
              </Grid>

              <Grid container className={classes.buttonsContainer} justify="space-between">
                <Button variant="outlined" type="submit" className={classes.w100}>
                  Save
                </Button>
              </Grid>
            </form>
          </Grid>
        </>
      )}
      cancelForm={() => onClose()}
      hideActions
      size="sm"
    />
  );
};

NewLabRange.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({
    cpt_name: PropTypes.string,
    seq: PropTypes.number,
    compare_item: PropTypes.string,
    compare_operator: PropTypes.string,
    compare_to: PropTypes.string,
    range_low: PropTypes.string,
    range_high: PropTypes.string,
    created: PropTypes.string,
    updated: PropTypes.string,
  }).isRequired,
};

export default NewLabRange;
