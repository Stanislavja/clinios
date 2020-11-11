import React, { useCallback, useEffect, useState } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import PatientService from "../../../../services/patient.service";
import { setError, setSuccess } from "../../../../store/common/actions";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
  },
  tableContainer: {
    minWidth: 650,
  },
  actions: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    border: "none",
    "& button": {
      fontSize: "12px",
    },
  },
  switchAction: {
    minWidth: 135,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "12px",
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontSize: 14,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& th": {
      fontSize: 12,
    },
    "& td": {
      fontSize: 12,
      height: "50px",
    },
  },
}))(TableRow);

const DiagnosesDetails = (props) => {
  const { data, patientId, reloadData } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState({});

  const mapStateForRows = useCallback(() => {
    const stateObj = {};
    data.forEach((item) => {
      stateObj[item.name] = true;
    });
    setState({ ...stateObj });
  }, [data]);

  useEffect(() => {
    mapStateForRows();
  }, [mapStateForRows]);

  const deleteItemHandler = (selectedItem) => {
    const icdId = selectedItem.icd_id;
    PatientService.deleteDiagnoses(patientId, icdId)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        reloadData();
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

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setState({ ...state, [name]: checked });
  };

  return (
    <TableContainer className={classes.tableContainer}>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Created</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>ICD Id</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!data
            && data.length
            ? data.map((row) => (
              <StyledTableRow key={`${row.created}_${row.icd_id}`}>
                <TableCell component="th" scope="row">
                  {moment(row.created).format("MMM D YYYY")}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.icd_id}</TableCell>

                <TableCell className={classes.actions}>
                  <IconButton
                    className={classes.button}
                    onClick={() => deleteItemHandler(row)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>

                <TableCell className={classes.switchAction}>
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={!!state[row.name]}
                        onChange={handleSwitchChange}
                        name={row.name}
                        color="primary"
                        size="small"
                      />
                    )}
                    label={state[row.name] ? "Active" : "In-Active"}
                  />
                </TableCell>
              </StyledTableRow>
            ))
            : (
              <StyledTableRow>
                <TableCell colSpan={4}>
                  <Typography align="center" variant="body1">
                    No Records Found...
                  </Typography>
                </TableCell>
              </StyledTableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DiagnosesDetails.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  patientId: PropTypes.string.isRequired,
  reloadData: PropTypes.func.isRequired,
};

export default DiagnosesDetails;
