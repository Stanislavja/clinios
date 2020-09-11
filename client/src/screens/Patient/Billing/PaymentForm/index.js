import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormFields } from "../../../../static/expandForm";

const Form = (props) => {
    const classes = useStyles();
    const { onClose } = props;

    const BasicInfo = FormFields.basicInfo;

    const [formFields, setFormFields] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zipPostal: '',
    })

    const processPaymentHandler = (e) => {
        
    }

    return (
        <>
            <Typography variant="h3" color="textSecondary" gutterBottom>Process Payment</Typography>
            <form>
                <Grid className={classes.inputRow}>
                    <Typography variant="h4" color="textPrimary" gutterBottom>Use existing payment method</Typography>
                    <Typography variant="h5" color="textPrimary" gutterBottom>Visa 0043</Typography>
                    <Typography variant="h5" color="textPrimary" gutterBottom>MasterCard 0222</Typography>
                    <Typography variant="h5" color="textPrimary" gutterBottom>Checking 0111</Typography>

                    <Typography variant="h5" color="textPrimary" gutterBottom>New Payment Method</Typography>

                    <Grid>
                        <FormControlLabel
                            className={classes.amountContainer}
                            value=""
                            control={
                                <TextField
                                    label=""
                                    name={'address'}
                                    // fullWidth
                                    // onChange={(e) => handleInputChnage(e)}
                                />
                            }
                            label="Amount"
                            labelPlacement="start"
                        />
                    </Grid>

                    <Button onClick={() => processPaymentHandler()} className={classes.processPaymentButton} variant="outlined" size="large">Process Payment</Button>
                </Grid>
            </form>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    inputRow: {
        margin: theme.spacing(3, 0),
    },
    processPaymentButton: {
        margin: theme.spacing(3, 0)
    },
    amountContainer: {
        marginLeft: "0px !important"
    }
})
)


export default Form;
