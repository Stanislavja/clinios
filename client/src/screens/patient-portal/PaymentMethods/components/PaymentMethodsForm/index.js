import React, { useEffect, useState } from "react";

import {
  TextField, Button, Grid, Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { CountryRegionData } from "react-country-region-selector";

import CountrySelect from "../../../../../components/common/CountrySelect";
import MaskInput from "../../../../../components/common/MaskInput";
import RegionSelect from "../../../../../components/common/RegionSelect";
import useAuth from "../../../../../hooks/useAuth";
import useDidMountEffect from "../../../../../hooks/useDidMountEffect";
import PaymentMethodService from "../../../../../services/patient_portal/payment-method.service";
import { paymentMethodType } from "../../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1 / 2),
    top: theme.spacing(1 / 2),
    color: "#ffffff",
  },
  formContainer: {
    margin: theme.spacing(3, 0),
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  customLabel: {
    fontSize: 16,
    color: "#37474f",
    marginBottom: theme.spacing(2),
  },
  buttonsContainer: {
    margin: theme.spacing(3, 0),
  },
}));

const PaymentMethodsForm = (props) => {
  const classes = useStyles();
  const { user } = useAuth();
  const patientId = user.id; // On the patient portal the signed-in user will always be a patient and by user.id we use the id of the currently signed-in user, Arslan
  const { enqueueSnackbar } = useSnackbar();
  const {
    isOpen, onClose, reloadData, cardData,
  } = props;
  const isEdit = Boolean(cardData);

  const [formFields, setFormFields] = useState({
    cardType: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const selectedCountry = CountryRegionData.filter(
      (countryArray) => countryArray[1] === formFields.country,
    );
    if (selectedCountry.length) { // country and state is present in the db
      setCountry(selectedCountry[0]);
      const regions = selectedCountry[0][2].split("|").map((regionPair) => {
        const [regionName = null, regionInShort] = regionPair.split("~");
        return [regionName, regionInShort];
      });
      const selectedRegion = regions.filter((x) => x[1] === formFields.state);
      setRegion(selectedRegion[0][1]);
    }
  }, [formFields]);

  const updateFields = () => {
    formFields.cardType = paymentMethodType(cardData.type);
    formFields.cardNumber = cardData.account_number;
    // formFields.cvv = cardData.account_number;
    formFields.expiryDate = moment(cardData.exp).format("MM-YY");
    setFormFields({ ...formFields });
  };

  useEffect(() => {
    if (cardData) {
      updateFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData]);

  const updateFormState = (key, value) => {
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    updateFormState(name, value);
  };

  const handleCountryRegion = (identifier, value) => {
    if (identifier === "country") {
      setCountry(value);
    } else if (identifier === "region") {
      setRegion(value);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        exp: formFields.expiryDate.replace("/", ""),
        type: formFields.cardType[0] || "V",
        cvc: formFields.cvv,
        account_number: formFields.cardNumber.replaceAll("/", ""),
        stripe_customer_id: user.stripe_customer_id,
        corp_stripe_customer_id: user.corp_stripe_customer_id,
      },
    };
    if (isEdit) {
      const paymentMethodId = cardData.id;
      PaymentMethodService.updatePaymentMethod(patientId, paymentMethodId, reqBody).then((response) => {
        enqueueSnackbar(`${response.message}`, { variant: "success" });
        reloadData();
        onClose();
      });
    } else {
      PaymentMethodService.createPaymentMethod(reqBody).then((response) => {
        enqueueSnackbar(`${response.message}`, { variant: "success" });
        reloadData();
        onClose();
      });
    }
  };

  const getCardType = () => {
    const { cardNumber } = formFields;
    const cardFirstDigit = cardNumber[0];
    const cardType = "cardType";

    if (cardFirstDigit === "3") {
      updateFormState(cardType, "American Express");
    } else if (cardFirstDigit === "4") {
      updateFormState(cardType, "Visa");
    } else if (cardFirstDigit === "5") {
      updateFormState(cardType, "Master");
    } else {
      updateFormState(cardType, "");
    }
  };

  useDidMountEffect(() => {
    getCardType();
  }, [formFields.cardNumber]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        {`${isEdit ? "Edit" : "Add"} Payment Method`}
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <form onSubmit={onFormSubmit}>
          <Grid className={classes.formContainer}>
            <Grid>
              <MaskInput
                required
                fullWidth
                className={classes.gutterBottom}
                type="text"
                name="cardNumber"
                label="Card Number"
                margin="dense"
                variant="outlined"
                value={formFields.cardNumber}
                mask="9999/9999/9999/9999"
                onChange={(e) => handleInputChange(e)}
              />
              {!!formFields.cardType && formFields.cardType.length ? (
                <Typography gutterBottom>{formFields.cardType}</Typography>
              )
                : null}
            </Grid>
            <Grid>
              <TextField
                required
                variant="outlined"
                margin="dense"
                name="cvv"
                id="cvv"
                type="number"
                label="CVV"
                className={classes.gutterBottom}
                value={formFields.cvv}
                onChange={(e) => handleInputChange(e)}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 3);
                }}
              />
            </Grid>

            <Grid>
              <MaskInput
                required
                className={classes.gutterBottom}
                type="text"
                name="expiryDate"
                label="Validity"
                margin="dense"
                variant="outlined"
                value={formFields.expiryDate}
                mask="99/99"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid>
              <TextField
                className={classes.gutterBottom}
                label="Address"
                name="address"
                value={formFields.address}
                fullWidth
                onChange={(e) => handleInputChange(e)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <TextField
                className={classes.gutterBottom}
                label="Address Line 2"
                name="address2"
                value={formFields.address2}
                fullWidth
                onChange={(e) => handleInputChange(e)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <TextField
                className={classes.gutterBottom}
                label="City"
                name="city"
                value={formFields.city}
                fullWidth
                onChange={(e) => handleInputChange(e)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <TextField
                className={classes.gutterBottom}
                label="Zip/Postal"
                name="postal"
                value={formFields.postal}
                fullWidth
                onChange={(e) => handleInputChange(e)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <CountrySelect
                id="country-select"
                error={null}
                name="country-select"
                helperText=""
                label="Country"
                handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                country={country}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid>
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
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container className={classes.buttonsContainer} justify="space-between">
            <Button variant="outlined" type="submit">
              {`${isEdit ? "Edit" : "Add"} Method`}
            </Button>
            <Button variant="outlined" onClick={() => onClose()}>
              Cancel
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

PaymentMethodsForm.defaultProps = {
  cardData: null,
};

PaymentMethodsForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
  cardData: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    exp: PropTypes.string,
    account_number: PropTypes.string,
  }),
};

export default PaymentMethodsForm;
