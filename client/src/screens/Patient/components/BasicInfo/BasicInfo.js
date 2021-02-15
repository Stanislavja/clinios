import React, { useEffect, useState } from "react";

import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import CountrySelect from "../../../../components/common/CountrySelect";
import RegionSelect from "../../../../components/common/RegionSelect";
import { StyledTableRowLg, StyledTableCellLg } from "../../../../components/common/StyledTable";
import usePatientContext from "../../../../hooks/usePatientContext";
import { togglePatientInfoDialog } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";
import {
  BasicInfoForm,
  InsuranceForm,
} from "../../../../static/patientBasicInfoForm";
import { calculateAge, paymentMethodType } from "../../../../utils/helpers";
import PaymentMethodsForm from "./components/PaymentMethodsForm";
import PharmaciesSearch from "./components/Pharmacies";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(1),
  },
  sectionCard: {
    padding: theme.spacing(1.5, 1),
  },
  halfSectionCard: {
    padding: theme.spacing(1.5, 1),
    minHeight: 198,
  },
  root: {
    border: "1px solid",
    margin: theme.spacing(0, 0, 1, 0),
    borderRadius: 0,
  },
  inputTextRow: {
    marginBottom: theme.spacing(3),
  },
  select: {
    lineHeight: "2.30em",
  },
  table: {
    background: "white",
  },
}));

const BasicInfo = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = usePatientContext();
  const formData = state.patientInfo.data;
  const paymentMethodsData = state.patientInfo.paymentMethods || [];
  const { patientId } = state;
  const { reloadData, reloadPaymentMethods } = props;
  const FirstRow = BasicInfoForm.firstRow;
  const SecondRow = BasicInfoForm.secondRow;
  const ThirdRow = BasicInfoForm.thirdRow;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [basicInfo, setBasicInfo] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    status: "",
    provider: "",
    phone_home: "",
    phone_cell: "",
    phone_work: "",
    phone_other: "",
    phone_note: "",
    email: "",
    dob: "",
    otherPhone: "",
    phoneNotes: "",
    gender: "",
    ssn: "",
    password: "",
    postal: "",
    address: "",
    address2: "",
    city: "",
    // insurance fields
    insurance_name: "",
    insurance_group: "",
    insurance_member: "",
    insurance_phone: "",
    insurance_desc: "",
  });

  useEffect(() => {
    formData.status = formData.status ? formData.status : "active";
    setBasicInfo({ ...formData });
  }, [formData]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setBasicInfo({
      ...basicInfo,
      [name]: value,
    });
  };

  const handleCountryRegion = (identifier, value) => {
    if (identifier === "country") {
      setCountry(value);
    } else if (identifier === "region") {
      setRegion(value);
    }
  };

  const onFormSubmit = () => {
    const reqBody = {
      data: {
        ...basicInfo,
        country: country[1],
        state: region,
      },
    };
    PatientService.updatePatient(patientId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.message}`, { variant: "success" });
        reloadData();
        dispatch(togglePatientInfoDialog());
      });
  };

  const toggleNewPaymentMethodDialog = () => {
    setShowPaymentMethodForm((prevState) => !prevState);
    if (selectedPaymentMethod) {
      setTimeout(() => {
        setSelectedPaymentMethod(null);
      }, 500);
    }
  };

  const editPaymentMethodHandler = (item) => {
    setSelectedPaymentMethod(item);
    toggleNewPaymentMethodDialog();
  };

  const deletePaymentMethodHandler = (item) => {
    const paymentMethodId = item.id;
    PatientService.deletePaymentMethod(patientId, paymentMethodId)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        reloadPaymentMethods();
      });
  };

  const resetEmailHandler = () => {
    enqueueSnackbar(`Reset Email Sent`, { variant: "success" });
  };

  return (
    <>
      <PaymentMethodsForm
        isOpen={showPaymentMethodForm}
        onClose={toggleNewPaymentMethodDialog}
        reloadData={reloadPaymentMethods}
        cardData={selectedPaymentMethod}
      />
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.root} variant="outlined">
            <Grid className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary" gutterBottom>
                Basic Information
              </Typography>
              <Grid container spacing={1} className={classes.inputRow}>
                {FirstRow.map((item) => (
                  <Grid key={item.name} item md={2}>
                    {item.baseType === "input" ? (
                      <TextField
                        label={item.label}
                        name={item.name}
                        value={basicInfo[item.name]}
                        id={item.id}
                        type={item.type}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                      />
                    ) : (
                      <TextField
                        select
                        placeholder={item.label}
                        label={item.label}
                        id={item.id}
                        name={item.name}
                        value={basicInfo[item.name]}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                      >
                        {item.options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={1} className={classes.inputRow} alignItems="flex-end">
                {SecondRow.map((item) => (
                  <Grid key={item.name} item md={2}>
                    {item.baseType === "input" ? (
                      <TextField
                        label={item.label}
                        name={item.name}
                        value={
                          item.type === "date"
                            ? moment(basicInfo[item.name]).format("YYYY-MM-DD")
                            : basicInfo[item.name]
                        }
                        id={item.id}
                        type={item.type}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                      />
                    ) : (
                      <TextField
                        select
                        placeholder={item.label}
                        label={item.label}
                        id={item.id}
                        name={item.name}
                        value={basicInfo[item.name]}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                      >
                        {item.options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Grid>
                ))}
                <Grid item md={2}>
                  <Typography>
                    &nbsp;&nbsp;Age:&nbsp;
                    {calculateAge(basicInfo.dob)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} className={classes.inputRow}>
                {ThirdRow.map((item) => (
                  <Grid key={item.name} item md={2}>
                    {item.baseType === "input" ? (
                      <TextField
                        label={item.label}
                        name={item.name}
                        value={basicInfo[item.name]}
                        id={item.id}
                        type={item.type}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                      />
                    ) : (
                      <TextField
                        select
                        placeholder={item.label}
                        label={item.label}
                        id={item.id}
                        name={item.name}
                        value={basicInfo[item.name]}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                      >
                        {item.options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item md={2}>
                  <Typography>
                    {`Last Login: ${moment().format("MMM D, YYYY")}`}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item md={2}>
                  <Button
                    variant="outlined"
                    onClick={() => resetEmailHandler()}
                  >
                    Send Reset Email
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.inputRow}>
        <Grid item xs={6}>
          <Paper className={classes.root} variant="outlined">
            <Grid className={classes.halfSectionCard}>
              <Typography variant="h5" color="textPrimary">
                Home Address
              </Typography>
              <Grid container spacing={1}>
                <Grid item lg={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={basicInfo.address}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    label="Address Line 2"
                    name="address2"
                    value={basicInfo.address2}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    label="City"
                    name="city"
                    value={basicInfo.city}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    type="number"
                    label="Zip/Postal"
                    name="postal"
                    value={basicInfo.postal}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item lg={3}>
                  <CountrySelect
                    id="country-select"
                    error={null}
                    name="country-select"
                    helperText=""
                    label="Country"
                    handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                    country={country}
                    margin="dense"
                  />
                </Grid>
                <Grid item lg={3}>
                  <RegionSelect
                    id="state-select"
                    error={null}
                    name="state-select"
                    helperText=""
                    label="State"
                    handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                    country={country}
                    region={region}
                    margin="dense"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.root} variant="outlined">
            <Grid className={classes.halfSectionCard}>
              <Typography variant="h5" color="textPrimary">
                Pharmacy
              </Typography>
              <Grid container spacing={1}>
                <PharmaciesSearch />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.root} variant="outlined">
            <Grid className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary">
                Insurance
              </Typography>
              <Grid container spacing={1} className={classes.inputRow}>
                {InsuranceForm.map((item) => (
                  <Grid key={item.name} item md={2}>
                    <TextField
                      label={item.label}
                      name={item.name}
                      id={item.id}
                      type={item.type}
                      value={basicInfo[item.name]}
                      fullWidth
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.root} variant="outlined">
            <Grid className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary">
                Payment Methods &nbsp;&nbsp;
                <span>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => toggleNewPaymentMethodDialog()}
                  >
                    New
                  </Button>
                </span>
              </Typography>
              <Table size="small" className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCellLg>Type</StyledTableCellLg>
                    <StyledTableCellLg align="center">Last Four</StyledTableCellLg>
                    <StyledTableCellLg align="center">Expires</StyledTableCellLg>
                    <StyledTableCellLg align="center">Actions</StyledTableCellLg>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentMethodsData.length
                    ? paymentMethodsData.map((row) => (
                      <StyledTableRowLg key={row.type}>
                        <StyledTableCellLg>{paymentMethodType(row.type)}</StyledTableCellLg>
                        <StyledTableCellLg align="center">{row.account_number}</StyledTableCellLg>
                        <StyledTableCellLg align="center">
                          {moment(row.exp).format("MMM D YYYY")}
                        </StyledTableCellLg>
                        <StyledTableCellLg align="center">
                          <IconButton onClick={() => editPaymentMethodHandler(row)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton onClick={() => deletePaymentMethodHandler(row)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </StyledTableCellLg>
                      </StyledTableRowLg>
                    ))
                    : (
                      <StyledTableRowLg>
                        <TableCell colSpan={4}>
                          <Typography align="center" variant="body1">
                            No Records Found...
                          </Typography>
                        </TableCell>
                      </StyledTableRowLg>
                    )}
                </TableBody>
              </Table>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Button onClick={() => onFormSubmit()} variant="outlined">
          Save
        </Button>
        <Button onClick={() => dispatch(togglePatientInfoDialog())} variant="outlined">
          Cancel
        </Button>
      </Grid>
    </>
  );
};

BasicInfo.propTypes = {
  reloadData: PropTypes.func.isRequired,
  reloadPaymentMethods: PropTypes.func.isRequired,
};

export default BasicInfo;
