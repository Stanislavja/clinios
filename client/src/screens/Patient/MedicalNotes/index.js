import React, { useState, useEffect } from "react";

import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import PatientService from "../../../services/patient.service";
import { setError, setSuccess } from "../../../store/common/actions";
import { setEditorText, resetEditorText } from "../../../store/patient/actions";

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

const MedicalNotes = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentEditorText = useSelector(
    (state) => state.patient.editorText,
    shallowEqual,
  );
  const {
    onClose, reloadData, patientId, oldMedicalNote,
  } = props;
  const [oldMedicalNoteState, setOldMedicalNoteState] = useState("");
  const [medicalNote, setMedicalNote] = useState("");

  useEffect(() => {
    setOldMedicalNoteState(oldMedicalNote);
    setMedicalNote(oldMedicalNote);
    dispatch(setEditorText(oldMedicalNote));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldMedicalNote]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    // TODO:: static for the time being - discussion required
    const noteId = 1;
    const reqBody = {
      data: {
        old_medical_note: oldMedicalNoteState,
        medical_note: medicalNote,
      },
    };
    PatientService.updateMedicalNotes(patientId, reqBody, noteId)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        reloadData();
        onClose();
      })
      .catch((error) => {
        const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
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
            required
            value={medicalNote}
            variant="outlined"
            name="medicalNote"
            id="medicalNote"
            type="text"
            fullWidth
            onChange={(e) => {
              setMedicalNote(e.target.value);
            }}
            onBlur={() => currentEditorText !== medicalNote && dispatch(setEditorText(medicalNote))}
            multiline
            rows={6}
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

MedicalNotes.propTypes = {
  oldMedicalNote: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  reloadData: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MedicalNotes;
