import React, { useEffect, useState } from "react";

import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import PatientService from "../../../../services/patient.service";
import { setError, setSuccess } from "../../../../store/common/actions";
import {
  setEditorText,
  resetEditorText,
} from "../../../../store/patient/actions";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  formInput: {
    marginBottom: theme.spacing(1),

    "& .MuiOutlinedInput-multiline": {
      padding: 5,
      fontSize: 12,
    },
  },
  actionContainer: {
    marginTop: theme.spacing(1),
  },
}));

const AdminNotes = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentEditorText = useSelector(
    (state) => state.patient.editorText,
    shallowEqual,
  );
  const {
    onClose, reloadData, patientId, oldAdminNote,
  } = props;
  const [oldAdminNoteState, setOldAdminNoteState] = useState("");
  const [formFields, setFormFields] = useState({
    notes: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  useEffect(() => {
    setOldAdminNoteState(oldAdminNote);
    const fieldName = "notes";
    setFormFields({
      ...formFields,
      [fieldName]: oldAdminNote,
    });
    dispatch(setEditorText(oldAdminNote));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldAdminNote]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        admin_note: formFields.notes,
        old_admin_note: oldAdminNoteState,
      },
    };
    // TODO:: static for the time being - discussion required
    const noteId = 1;
    PatientService.updateAdminNotes(patientId, reqBody, noteId)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        reloadData();
        onClose();
      })
      .catch((error) => {
        const resMessage = (error.response
          && error.response.data
          && error.response.data.message[0].msg)
          || error.message
          || error.toString();
        const severity = "error";
        dispatch(
          setError({
            severity,
            message: resMessage,
          }),
        );
      });
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Grid className={classes.formInput} item md={12}>
          <TextField
            variant="outlined"
            value={formFields.notes}
            name="notes"
            id="notes"
            type="text"
            fullWidth
            onChange={(e) => handleInputChange(e)}
            onBlur={() => currentEditorText !== formFields.notes && dispatch(setEditorText(formFields.notes))}
            multiline
            rows={5}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                onClose();
                dispatch(resetEditorText());
              }
            }}
          />
        </Grid>
      </form>
    </>
  );
};

AdminNotes.propTypes = {
  onClose: PropTypes.func.isRequired,
  patientId: PropTypes.string.isRequired,
  reloadData: PropTypes.func.isRequired,
  oldAdminNote: PropTypes.string.isRequired,
};

export default AdminNotes;
