import React, { useState } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Dialog from "../../../components/Dialog";
import { TransactionFormFields } from "../../../static/transactionForm";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  formInput: {
    marginBottom: theme.spacing(1),
  },
  customLabel: {
    fontSize: 16,
    color: "#37474f",
  },
}));

const NewTransactionForm = (props) => {
  const classes = useStyles();
  const { isOpen, onClose } = props;

  const [formFields, setFormFields] = useState({
    date: "",
    type: "",
    paymentType: "",
    amount: "",
    accountNum: "",
    notes: "",
  });

  const handleInputChnage = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      title={" "}
      message={(
        <>
          <Grid container justify="space-between">
            <Typography variant="h3" color="textSecondary">
              New Transaction
            </Typography>
          </Grid>
          <form onSubmit={onFormSubmit}>
            <Grid className={classes.inputRow}>
              {TransactionFormFields.map((item) => (
                <Grid
                  key={item.name}
                  container
                  alignItems="center"
                  className={classes.formInput}
                >
                  <Grid item lg={2}>
                    <label htmlFor={item.label} variant="h4" color="textSecondary">
                      {item.label}
                    </label>
                  </Grid>
                  <Grid item md={4}>
                    {item.baseType === "input" ? (
                      <TextField
                        variant="standard"
                        name={item.name}
                        id={item.id}
                        type={item.type}
                        required
                        fullWidth
                        value={formFields[item.name]}
                        onChange={(e) => handleInputChnage(e)}
                      />
                    ) : (
                      <TextField
                        select
                        placeholder={item.label}
                        id={item.id}
                        name={item.name}
                        value={formFields[item.name]}
                        required
                        fullWidth
                        onChange={(e) => handleInputChnage(e)}
                      >
                        {item.options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Grid>
                </Grid>
              ))}
              <Grid className={classes.formInput} item lg={2}>
                <Typography className={classes.customLabel} color="textSecondary">
                  Notes
                </Typography>
              </Grid>
              <Grid item md={12}>
                <TextField
                  variant="outlined"
                  name="notes"
                  id="notes"
                  type="text"
                  required
                  fullWidth
                  value={formFields.notes}
                  onChange={(e) => handleInputChnage(e)}
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>

            <Grid container justify="space-between">
              <Button
                variant="outlined"
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
            </Grid>
          </form>
        </>
      )}
      cancelForm={() => onClose()}
      hideActions
      size="md"
    />
  );
};

NewTransactionForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewTransactionForm;
